import { UseMutationResult } from "@tanstack/react-query";

import { CatalogResults } from "../lib/type";

import Error from "./Error";
import Catalog from "./Catalog";
import Pagination from "./Pagination";

export default function SearchResults({
  mutationObj,
  search,
}: SearchResultTypes) {
  const { data, mutate, error, isPending, status, isError } = mutationObj;

  return (
    <>
      {status === "success" && (
        <>
          <Pagination
            hasNextPage={data.paginationDetails?.nextCursor ? true : false}
            hasPreviousPage={
              data.paginationDetails?.previousCursor ? true : false
            }
            fetchNextPage={function () {
              mutate({
                search,
                cursor: data.paginationDetails.nextCursor,
              });
            }}
            fetchPreviousPage={function () {
              mutate({
                search,
                cursor: data.paginationDetails.previousCursor,
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
