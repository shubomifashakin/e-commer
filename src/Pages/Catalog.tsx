import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

import SearchResults from "../components/SearchResults";
import CatalogContainer from "../components/CatalogContainer";

import { getCatalog, getSearchCatalog } from "../lib/data-service";

export default function Page() {
  const [search, setSearch] = useState<string>("");

  //fetches the first 5 products on mount and select only the latest fetched data
  const infiniteQueryObj = useInfiniteQuery({
    queryKey: ["products"],

    queryFn: ({ pageParam }) => getCatalog(pageParam),

    initialPageParam: 0,

    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.paginationDetails.hasNextPage) {
        return lastPageParam + 1;
      }
    },

    getPreviousPageParam: (firstPage) => {
      if (firstPage.paginationDetails.hasPreviousPage) {
        return firstPage.paginationDetails.previousPage;
      }
    },

    select: (data) => {
      //always return the last data fetched
      return data.pages[data.pages.length - 1];
    },

    maxPages: 1,
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
      let timeoutId: number;

      function fetchSearchedProduct() {
        timeoutId = setTimeout(function () {
          mutate({ name: search });
        }, 500);
      }

      //only run the function when the search chars >3
      if (search.length >= 3) {
        fetchSearchedProduct();
      }

      return () => clearTimeout(timeoutId);
    },
    [search, mutate]
  );

  return (
    <div className="w-full h-full gap-y-2 flex flex-col items-center ">
      <SearchBar search={search} setSearch={setSearch} />

      <div className="flex w-ful flex-grow">
        <div className="space-y-2 w-full p-4 flex flex-col items-center justify-center">
          {/* renders when the search is <= 3 */}
          {search.length < 3 && (
            <CatalogContainer infiniteQueryObj={infiniteQueryObj} />
          )}

          {/* renders when the length of search chars is >= 3  */}
          {search.length >= 3 && (
            <SearchResults
              search={search}
              mutationObj={{ mutate, ...mutationObj }}
            />
          )}
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
