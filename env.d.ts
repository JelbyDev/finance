interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type ImportMetaEnv = {
  readonly BASE_URL: string;
  readonly DEV: boolean;
};
