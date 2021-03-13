import router from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsSubmitter = () => {
  const { data, loading } = useMeQuery();
  useEffect(() => {
    if (!loading) {
      if (!data?.me) {
        // Not logged in, enforce that first
        router.replace("/login?next=" + router.pathname);
      } else if (!data.me.isSubmitter) {
        // Logged in, but not a submitter
        router.replace("/");
      }
    }
  }, [loading, data, router]);
  return data?.me?.id;
};
