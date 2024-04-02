import Store from "electron-store";
import { Document } from "../shared/types/ipc";

// Tipagem do banco de dados
interface StoreType {
  documents: Record<string, Document>;
}

export const store = new Store<StoreType>({
  // Define como valor padrão e inicial os documentos como um objeto vazio
  defaults: {
    documents: {},
  },
});
console.log(store.path);
