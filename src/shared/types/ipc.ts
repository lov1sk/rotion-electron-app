import { IpcRendererEvent } from "electron";

export interface Document {
  id: string;
  title: string;
  content?: string;
}

/**
 * Request
 */
export type SaveDocumentRequest = Document;

export interface FetchDocumentRequest {
  id: string;
}

export interface DeleteDocumentRequest {
  id: string;
}

export interface OnNewDocumentRequest {
  callback: () => void;
}

/**
 * Response
 */
export interface FetchAllDocumentsResponse {
  data: Document[];
}

export interface FetchDocumentResponse {
  data: Document;
}

export interface CreateDocumentResponse {
  data: Document;
}
