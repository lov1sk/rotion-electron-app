import { ipcMain } from "electron";
import { IPC } from "../shared/constants/ipc";
import {
  CreateDocumentResponse,
  DeleteDocumentRequest,
  Document,
  FetchAllDocumentsResponse,
  FetchDocumentRequest,
  FetchDocumentResponse,
  SaveDocumentRequest,
} from "../shared/types/ipc";
import { store } from "./store";
import { randomUUID } from "crypto";

// Busca todos os documentos
ipcMain.handle(IPC.DOCUMENTS.FETCH_ALL, (): FetchAllDocumentsResponse => {
  const data = Object.values(store.get("documents"));

  return {
    data,
  };
});

// Busca um unico documento
ipcMain.handle(
  IPC.DOCUMENTS.FETCH,
  async (
    _event,
    { id }: FetchDocumentRequest
  ): Promise<FetchDocumentResponse> => {
    const document = store.get(`documents.${id}`) as Document;

    return {
      data: document,
    };
  }
);

// Cria um novo documento
ipcMain.handle(
  IPC.DOCUMENTS.CREATE,
  async (): Promise<CreateDocumentResponse> => {
    const document = {
      id: randomUUID(),
      title: "Untitled",
    };
    store.set(`documents.${document.id}`, document);
    return {
      data: document,
    };
  }
);
ipcMain.handle(
  IPC.DOCUMENTS.SAVE,
  async (_, { id, title, content }: SaveDocumentRequest): Promise<void> => {
    store.set(`documents.${id}`, {
      id,
      title,
      content,
    });
  }
);

ipcMain.handle(
  IPC.DOCUMENTS.DELETE,
  async (_, { id }: DeleteDocumentRequest): Promise<void> => {
    // @ts-ignore (https://github.com/sindresorhus/electron-store/issues/196)
    store.delete(`documents.${id}`);
  }
);
