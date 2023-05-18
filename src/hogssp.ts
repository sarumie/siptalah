/**
 * * HOGSSP: High Order GetServerSideProps.
 * * This is a wrapper around getServerSideProps that allows you to
 */

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps, GetServerSidePropsResult } from "next";

/**
 * Memberi hak akses untuk user yang sudah login.
 */
export function requireSupaAuth(): GetServerSideProps;
export function requireSupaAuth<Props extends { [key: string]: unknown }>(
  gssp?: GetServerSideProps<Props>
): GetServerSideProps<Props>;
export function requireSupaAuth<Props extends { [key: string]: unknown }>(
  gssp?: GetServerSideProps<Props>
): GetServerSideProps<Props | {}> {
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

/**
 * Mencegah user yang sudah login untuk mengakses halaman tertentu.
 */
export function requireSupaUnAuth(): GetServerSideProps;
export function requireSupaUnAuth<Props extends { [key: string]: unknown }>(
  gssp?: GetServerSideProps<Props>
): GetServerSideProps<Props>;
export function requireSupaUnAuth<Props extends { [key: string]: unknown }>(
  gssp?: GetServerSideProps<Props>
): GetServerSideProps<Props | {}> {
  return async (ctx) => {
    const supabase = createServerSupabaseClient(ctx);
    const { data: session } = await supabase.auth.getSession();

    if (session) {
      return {
        redirect: {
          destination: "/",
          permanent: false
        }
      };
    }

    return gssp ? await gssp(ctx) : { props: {} };
  };
}

