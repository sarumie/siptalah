/**
 * * HOGSSP: High Order GetServerSideProps.
 * * This is a wrapper around getServerSideProps that allows you to
 */

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";

/**
 * Memvalidasi apakah user sudah login atau belum.
 */
export function requireSupaAuth(gssp?: GetServerSideProps): GetServerSideProps {
  return async (ctx) => {
    const supabase = createServerSupabaseClient(ctx);

    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session)
      return {
        redirect: {
          destination: "/login",
          permanent: false
        }
      };

    return gssp ? await gssp(ctx) : { props: {} };
  };
}

