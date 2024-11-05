import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

import SearchResults from "../components/SearchResults";

import { getCatalog, getSearchCatalog } from "../lib/data-service";
import CatalogContainer from "../components/CatalogContainer";

export default function Page() {
  const [search, setSearch] = useState<string>("");

  //fetches the first 10 products on mount and select only the latest fetched data
  const infiniteQueryObj = useInfiniteQuery({
    queryKey: ["products"],

    queryFn: ({ pageParam }) => getCatalog(pageParam),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => lastPage.paginationDetails.nextCursor,

    getPreviousPageParam: (lastpage) =>
      lastpage.paginationDetails.previousCursor,

    select: (data) => {
      //always return the last data fetched
      return data.pages[data.pages.length - 1];
    },
  });

  //fetches the searched product
  const { mutate, ...mutationObj } = useMutation({
    mutationKey: ["search-products"],
    mutationFn: getSearchCatalog,
  });

  //debounce the mutation
  //fetches the searched product everytime user finishes typing
  useEffect(
    function () {
      const timeoutId = setTimeout(function () {
        //fetch the data
        mutate({ search });
      }, 500);

      return () => clearTimeout(timeoutId);
    },
    [search, mutate]
  );

  return (
    <div className="h-dvh w-full py-6 px-10 ">
      <div className="w-full h-full gap-y-2 flex flex-col items-center ">
        <SearchBar search={search} setSearch={setSearch} />

        <div className="flex w-full  flex-grow">
          <div className="space-y-2 w-full flex flex-col">
            {/*renders when the search is <= 3 */}
            {search.length < 3 && (
              <CatalogContainer
                infiniteQueryObj={infiniteQueryObj}
                search={search}
              />
            )}

            {/*renders when the length of search chars is >= 3  */}
            {search.length >= 3 && (
              <SearchResults
                search={search}
                mutationObj={{ mutate, ...mutationObj }}
              />
            )}
          </div>
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
