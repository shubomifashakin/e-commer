import { UseMutationResult } from "@tanstack/react-query";

import { CatalogResults } from "../lib/type";

import Error from "./Error";
import Catalog from "./Catalog";
import Pagination from "./Pagination";
import { useRef } from "react";

export default function SearchResults({
  mutationObj,
  search,
}: SearchResultTypes) {
  const { data, mutate, error, isPending, status, isError } = mutationObj;

  const cursor = useRef<number>(1);

  return (
    <>
      {status === "success" && (
        <>
          <Pagination
            hasNextPage={data.paginationDetails?.hasNextPage ? true : false}
            hasPreviousPage={
              data.paginationDetails?.hasPreviousPage ? true : false
            }
            fetchNextPage={function () {
              cursor.current = cursor.current + 1;

              mutate({
                search,
                cursor: cursor.current,
              });
            }}
            fetchPreviousPage={function () {
              cursor.current =
                cursor.current > 1 ? cursor.current - 1 : cursor.current;

              mutate({
                search,
                cursor: cursor.current,
              });
            }}
            isPending={isPending}
          />

          <div className="flex-grow items-center flex justify-center">
            {!isPending && <Catalog catalog={data.catalog} />}

            {isPending && <p>Loading..</p>}
          </div>
        </>
      )}

      {isError && (
        <Error
          refetchFn={() => mutate({ search })}
          error={error}
          isFetching={isPending}
        />
      )}
    </>
  );
}

type SearchResultTypes = {
  mutationObj: UseMutationResult<
    CatalogResults,
    Error,
    {
      search: string;
      cursor?: number;
    },
    unknown
  >;
  search: string;
};
