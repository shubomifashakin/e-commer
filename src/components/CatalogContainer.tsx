import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { CatalogResults } from "../lib/type";
import Pagination from "./Pagination";
import Catalog from "./Catalog";
import Error from "./Error";

export default function CatalogContainer({
  infiniteQueryObj,
  search,
}: {
  infiniteQueryObj: UseInfiniteQueryResult<CatalogResults, Error>;
  search: string;
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
        <>
          <Pagination
            isPending={isFetching}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            fetchNextPage={fetchNextPage}
            fetchPreviousPage={fetchPreviousPage}
          />

          <div className="flex-grow items-center flex justify-center">
            {!isFetching && <Catalog catalog={data.catalog} />}

            {isFetching && <p>Loading..</p>}
          </div>
        </>
      )}

      {status === "pending" && <p>Loading..</p>}

      {isError && (
        <Error refetchFn={refetch} error={error} isFetching={isFetching} />
      )}
    </>
  );
}
