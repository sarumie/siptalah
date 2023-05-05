declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      NEXT_PUBLIC_SUPABASE_URL: string;
      DATABASE_URL: string;
      SHADOW_DATABASE_URL: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
    }
  }
}

export {};

