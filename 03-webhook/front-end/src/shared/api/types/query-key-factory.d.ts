import "@tanstack/react-query";

type AppArea =
  | "webhook"
  | "webhooks"
  | "environment_variable"
  | "environment_variables";

type MyQueryKey = [AppArea, ...ReadonlyArray<unknown>];

declare module "@tanstack/react-query" {
  interface Register {
    queryKey: MyQueryKey;
  }
}
