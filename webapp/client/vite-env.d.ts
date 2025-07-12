/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KLING_API_URL?: string;
  readonly VITE_KLING_API_KEY?: string;
  readonly VITE_REPLICATE_API_URL?: string;
  readonly VITE_REPLICATE_API_KEY?: string;
  readonly VITE_REIMAGINE_API_URL?: string;
  readonly VITE_REIMAGINE_API_KEY?: string;
  readonly VITE_MODSY_API_URL?: string;
  readonly VITE_MODSY_API_KEY?: string;
  readonly VITE_3DLOOK_API_URL?: string;
  readonly VITE_3DLOOK_API_KEY?: string;
  readonly VITE_BODYLABS_API_URL?: string;
  readonly VITE_BODYLABS_API_KEY?: string;
  readonly VITE_CLOTHING_PROVIDER?: string;
  readonly VITE_DECOR_PROVIDER?: string;
  readonly VITE_SIZING_PROVIDER?: string;
  readonly NODE_ENV?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
