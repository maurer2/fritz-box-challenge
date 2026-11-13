/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MSW_BEHAVIOUR?: string;
}

declare const MOCK_DATA: string; // gets replaced by vite with the content of the mock file
