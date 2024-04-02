import clsx from "clsx";
import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { Code, CaretDoubleRight, TrashSimple } from "phosphor-react";
import * as Breadcrumbs from "./Breadcrumbs";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Document } from "~/src/shared/types/ipc";
import { useMemo } from "react";

interface HeaderProps {
  isSidebarOpen: boolean;
}

export function Header({ isSidebarOpen }: HeaderProps) {
  const { id } = useParams();
  const isMacOS = process.platform === "darwin";

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: document } = useQuery({
    queryKey: ["active-document", id],
    queryFn: async () => {
      const response = await window.api.fetchDocument({ id: id! });

      return response.data ?? null;
    },
  });

  // Deleta o documento
  const { mutateAsync: deleteDocument, isPending: isDeletingDocument } =
    useMutation({
      mutationFn: async () => {
        await window.api.deleteDocument({ id: id! });
      },
      onSuccess: () => {
        queryClient.setQueryData<Document[]>(["documents"], (documents) => {
          return documents?.filter((document) => document.id !== id);
        });

        navigate("/");
      },
    });

  /**
     * Se existir id, eu quero mudar sempre que o document mudar, se não existir id quero que não faça nd
    const initialContent = useMemo(() => {
      // Se existir informações do documento iniciais, ele mostra, caso o documento atualize ele atualiza os valores com os novos dados
      if (document) {
        return `<h1>${document.title}</h1>${document.content ?? "<p></p>"}`;
      }
      return "";
    }, [document]);
 */
  return (
    <div
      className={clsx(
        "border-b border-rotion-600 py-[1.125rem] h-14 px-6 flex items-center gap-4 leading-tight transition-all duration-250 region-drag",
        {
          "pl-24": !isSidebarOpen && isMacOS,
          "w-screen": !isSidebarOpen,
          "w-[calc(100vw-240px)]": isSidebarOpen,
        }
      )}
    >
      <RadixCollapsible.Trigger
        className={clsx(
          "h-5 w-5 text-rotion-200 hover:text-rotion-50 hover:cursor-pointer region-no-drag",
          {
            hidden: isSidebarOpen,
          }
        )}
      >
        <CaretDoubleRight className="h-4 w-4" />
      </RadixCollapsible.Trigger>

      <div className={clsx({ "flex gap-8": !isMacOS })}>
        <Breadcrumbs.Root>
          <Breadcrumbs.Item>
            <Code weight="bold" className="h-4 w-4 text-pink-500" />

            {/** Se estivermos na pagina de um documento, ele exibe o titulo, caso contrario exibe "inicio" */}
            {id ? "Documentos salvos" : "Inicio"}
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item isActive>
            {document?.title ?? null}
          </Breadcrumbs.Item>
        </Breadcrumbs.Root>

        {/** Se estivermos na pagina de um documento, ele exibe o botão de deletar, caso contrario não exibe nada */}
        {id && (
          <div className="inline-flex region-no-drag">
            <button
              onClick={() => deleteDocument()}
              disabled={isDeletingDocument}
              className="inline-flex items-center gap-1 text-rotion-100 text-sm hover:text-rotion-50 disabled:opacity-50"
            >
              <TrashSimple className="h-4 w-4" />
              Apagar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
