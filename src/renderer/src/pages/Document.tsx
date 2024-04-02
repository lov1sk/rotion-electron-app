import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Editor, OnContentUpdatedParams } from "../components/Editor";
import { ToC } from "../components/ToC";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { Document as IPCDocument } from "../../../shared/types/ipc";

export function Document() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  /**
   * Query para buscar o documento que foi clicado e mostrar informações em tela
   */
  const { data: document, isFetching: isLoadingDocument } = useQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      const response = await window.api.fetchDocument({ id: id! });
      return response.data;
    },
  });

  /**
   * Mutação para salvar os documentos e refletir isso na sidebar
   */
  const { mutateAsync: saveDocument } = useMutation({
    mutationFn: async ({ title, content }: OnContentUpdatedParams) => {
      // Chamamos o IPC para atualizar o conteudo com o electron store
      await window.api.saveDocument({ id: id!, title, content });
    },
    onSuccess: (_data, variables) => {
      // Ao atualizar o documento, ele atualiza o dado em cache para não ser necessario fazer uma nova requisição
      queryClient.setQueryData(["documents"], (documents: IPCDocument[]) => {
        return documents.map((document) => {
          // Se acharmos o documento com o id, atualizamos ele
          if (document.id === id) {
            console.log("achou o id");

            return {
              ...document,
              title: variables.title,
              content: variables.content,
            };
          }
          // de restante retornamos o documento do jeito que estava
          return document;
        });
      });
      queryClient.setQueryData(
        ["active-document", id],
        (ipcDocument: IPCDocument) => {
          console.log(ipcDocument);

          return {
            ...ipcDocument,
            title: variables.title,
            content: variables.content,
          };
        }
      );
      // ["document", id],
    },
  });

  const initialContent = useMemo(() => {
    // Se existir informações do documento iniciais, ele mostra, caso o documento atualize ele atualiza os valores com os novos dados
    if (document) {
      return `<h1>${document.title}</h1>${document.content ?? "<p></p>"}`;
    }
    return "";
  }, [document]);
  return (
    <main className="flex-1 flex py-12 px-10 gap-8">
      <aside className="hidden lg:block sticky top-0">
        <span className="text-rotion-100 font-semibold text-xs">
          Table of Contents
        </span>

        <ToC.Root>
          <ToC.Link> Back-end</ToC.Link>
          <ToC.Section>
            <ToC.Link> PostgreSQl</ToC.Link>
            <ToC.Link> NodeJs</ToC.Link>
            <ToC.Link> Docker</ToC.Link>
          </ToC.Section>
        </ToC.Root>
      </aside>
      <section className="flex flex-1 flex-col items-center text-rotion-100">
        {!isLoadingDocument && document && (
          <Editor
            onContentUpdated={({ title, content }) =>
              saveDocument({ title, content })
            }
            content={initialContent}
          />
        )}
      </section>
    </main>
  );
}
