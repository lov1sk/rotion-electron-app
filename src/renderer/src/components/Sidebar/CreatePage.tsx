import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Document } from "~/src/shared/types/ipc";
import { Plus } from "phosphor-react";

export function CreatePage() {
  const queryClient = useQueryClient();

  const { isPending: isCreatingNewDocument, mutateAsync: createNewDocument } =
    useMutation({
      mutationFn: async () => {
        const response = await window.api.createDocument();

        return response.data;
      },
      onSuccess: (data: Document) => {
        // Aproveita os dados da query e adiciona ao fim um novo registro ao final
        queryClient.setQueryData(["documents"], (documents: Document[]) => {
          return [...documents, data];
        });
        // Faz o refetch de dados dos documentos
        // queryClient.invalidateQueries({ queryKey: ["documents"] });
      },
    });
  return (
    <button
      onClick={() => createNewDocument()}
      disabled={isCreatingNewDocument}
      className="flex text-rotion-100 w-[240px] px-5 items-center text-sm gap-2 absolute bottom-0 left-0 right-0 py-4 border-t border-rotion-600 hover:bg-rotion-700 disabled:opacity-60"
    >
      <Plus className="h-4 w-4" />
      Novo documento
    </button>
  );
}
