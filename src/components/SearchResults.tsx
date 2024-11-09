import { UseMutationResult } from "@tanstack/react-query";

import { CatalogResults } from "../lib/type";

import Error from "./Error";
import Catalog from "./Catalog";
import Pagination from "./Pagination";
import { useRef } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function SearchResults({
  mutationObj,
  search,
}: SearchResultTypes) {
  const { data, mutate, error, isPending, status, isError } = mutationObj;

  const skip = useRef<number>(0);

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
              skip.current = skip.current + 1;

              mutate({
                name: search,
                skip: skip.current,
              });
            }}
            fetchPreviousPage={function () {
              skip.current = skip.current > 0 ? skip.current - 1 : skip.current;

              mutate({
                name: search,
                skip: skip.current,
              });
            }}
            isPending={isPending}
          />

          <div className="flex-grow items-center flex justify-center">
            {/*if products werefound rnder catalog list, if not show no product found */}
            {data.catalog.length ? (
              <Catalog catalog={data.catalog} />
            ) : (
              <p className="text-sm">No Product Found</p>
            )}
          </div>
        </>
      )}

      {isPending && <LoadingSpinner />}

      {isError && (
        <Error
          refetchFn={() => mutate({ name: search })}
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
      name: string;
      skip?: number;
    },
    unknown
  >;
  search: string;
};
