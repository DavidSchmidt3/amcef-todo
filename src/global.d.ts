interface ImportMetaEnv {
  readonly API_URL: string;
  readonly VITE_VERCEL_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
