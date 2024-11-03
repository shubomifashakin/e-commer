import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CatalogResults, getCatalog, Product } from "../lib/data-service";

export default function Page() {
  const [search, setSearch] = useState<string>("");

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
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
    <div className="h-dvh w-full flex py-5 px-10 justify-center items-center flex-grow">
      <div className="w-full h-full gap-y-2 flex flex-col items-center ">
        <SearchBar search={search} setSearch={setSearch} />

        <div className="flex items-center justify-center flex-grow">
          {status === "success" &&
            data.pages.map((page, i) => {
              return <Catalog catalog={page.data} key={i} />;
            })}
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
      placeholder="search for your next purchase..."
      className="p-2 rounded-md bg-transparent  focus:border-blue-400 border focus:ring-1 focus:ring-blue-400 transition-all duration-500 ease-in-out placeholder:text-sm w-1/2 outline-none "
    />
  );
}

function Catalog({ catalog }: { catalog: Product[] }) {
  return (
    <div className="grid grid-rows-2 items-center grid-cols-5 justify-between gap-12">
      {catalog.map((product, i) => {
        return <ProductCard key={i} details={product} />;
      })}
    </div>
  );
}

function ProductCard({ details }: { details: Product }) {
  return (
    <div className=" w-36 bg-secondary h-fit p-1.5 rounded-sm">
      <div className="w-full overflow-hidden rounded-sm h-1/2">
        <img
          className="object-cover"
          src="https://th.bing.com/th/id/R.18f14463a91f8316ec8daea09ab5baaf?rik=1ONxPv6onaga7A&pid=ImgRaw&r=0"
          alt="an image"
        />
      </div>

      <div>
        <p className="text-sm">Product Name</p>
        <p>$300</p>
      </div>
    </div>
  );
}
