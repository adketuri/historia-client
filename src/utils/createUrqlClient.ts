import { dedupExchange, fetchExchange, ssrExchange } from "urql";
import {
  LogoutMutation,
  MeQuery,
  MeDocument,
  LoginMutation,
  RegisterMutation,
} from "../generated/graphql";
import { cacheExchange, NullArray, Resolver } from "@urql/exchange-graphcache";
import { updateQueryTyped } from "./updateQueryTyped";
import { stringifyVariables } from "@urql/core";
import { GAME_FETCH_LIMIT } from "../pages";

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        PaginatedGames: () => null,
      },
      resolvers: {
        Query: {
          games: cursorPagination(),
        },
      },
      updates: {
        Mutation: {
          createGame: (_result, args, cache, info) => {
            const allFields = cache.inspectFields("Query");
            const fieldInfos = allFields.filter(
              (info) => info.fieldName === "games"
            );
            fieldInfos.forEach((fi) => {
              cache.invalidate("Query", "games", fi.arguments || {});
            });
          },
          logout: (_result, args, cache, info) => {
            updateQueryTyped<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
          login: (_result, args, cache, info) => {
            updateQueryTyped<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            updateQueryTyped<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
  fetchOptions: {
    credentials: "include" as const,
  },
});

export type MergeMode = "before" | "after";

export interface PaginationParams {
  cursorArgument?: string;
}

export const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;

    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    console.log("fieldArgs: ", fieldArgs);
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    console.log("fieldKey", fieldKey);
    const cached = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "games"
    );
    console.log("cached", cached);
    info.partial = !cached;
    console.log("partial", info.partial);

    let hasMore = true;

    // Check if data is in cache, return it if so
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "games") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      console.log("data:: ", data);
      results.push(...data);
    });
    console.log(results);

    return {
      __typename: "PaginatedGames",
      hasMore,
      games: results,
    };
  };
};
