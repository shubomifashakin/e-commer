import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { CatalogResults } from "../lib/type";
import Pagination from "./Pagination";
import Catalog from "./Catalog";
import Error from "./Error";
import LoadingSpinner from "./LoadingSpinner";

export default function CatalogContainer({
  infiniteQueryObj,
}: {
  infiniteQueryObj: UseInfiniteQueryResult<CatalogResults, Error>;
}) {
  const {
    data,
    error,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetching,
    status,
    isError,
    refetch,
  } = infiniteQueryObj;

  return (
    <>
      {status === "success" && (
        <div className="space-y-2 flex flex-col h-full ">
          <Pagination
            isPending={isFetching}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            fetchNextPage={fetchNextPage}
            fetchPreviousPage={fetchPreviousPage}
          />

          <div className="flex-grow items-center flex justify-center">
            {!isFetching && <Catalog catalog={data.catalog} />}

            {isFetching && <LoadingSpinner />}
          </div>
        </div>
      )}

      {status === "pending" && <LoadingSpinner size="30px" />}

      {isError && (
        <Error refetchFn={refetch} error={error} isFetching={isFetching} />
      )}
    </>
  );
}
