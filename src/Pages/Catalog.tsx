import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import Catalog from "../components/Catalog";

import { getCatalog } from "../lib/data-service";

export default function Page() {
  const [search, setSearch] = useState<string>("");

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: ({ pageParam }) => getCatalog(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.paginationDetails.nextCursor,
  });

  //debounce the fetching
  useEffect(
    function () {
      const timeoutId = setTimeout(function () {
        //fetch the data
        console.log(search);
      }, 1500);

      return () => clearTimeout(timeoutId);
    },
    [search]
  );

  return (
    <div className="h-dvh w-full flex py-6 px-10 justify-center items-center flex-grow">
      <div className="w-full h-full gap-y-2 flex flex-col items-center ">
        <SearchBar search={search} setSearch={setSearch} />

        <div className="flex items-center justify-center flex-grow">
          {status === "success" &&
            data.pages.map((page, i) => {
              return <Catalog catalog={page.data} key={i} />;
            })}

          {status === "pending" && <p>Loading..</p>}

          {status === "error" && <p>{error.message}</p>}
        </div>
      </div>
    </div>
  );
}

function SearchBar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="search for a product..."
      className="p-2 rounded-md focus:shadow-sm focus:shadow-white hover:shadow-white hover:shadow-sm bg-transparent border  transition-all duration-500 ease-in-out placeholder:text-sm w-1/2 outline-none "
    />
  );
}
