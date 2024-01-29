/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PREDECTION_URL1: string
    readonly VITE_PREDECTION_URL2: string
    readonly VITE_API_URL: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }