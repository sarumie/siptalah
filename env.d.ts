declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;
      DATABASE_URL: string;
      SHADOW_DATABASE_URL: string;
      SUPABASE_KEY: string;
      SUPABASE_URL: string;
    }
  }
}

export {};

