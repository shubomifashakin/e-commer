import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "../hooks/useSession";

import { getOrderHistory } from "../lib/data-service";
import { PastOrder } from "../lib/type";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";

export default function Page() {
  //gets the user session from the cookie
  const [userInfo] = useSession();
  const navigate = useNavigate();

  //fetches the first 5 past orders on mount and select only the latest fetched data
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
  } = useInfiniteQuery({
    queryKey: ["history"],

    queryFn: ({ pageParam }) => getOrderHistory(pageParam),

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

  //if there is no userinfo go back to login
  useEffect(
    function () {
      if (!userInfo) {
        navigate("/login?redirect_url=orders/history");
      }
    },
    [userInfo, navigate]
  );

  //render them
  return (
    <div className="h-dvh w-full flex items-center justify-center">
      {status === "success" && (
        <div className="space-y-2 flex flex-col h-full w-full ">
          <Pagination
            isPending={isFetching}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            fetchNextPage={fetchNextPage}
            fetchPreviousPage={fetchPreviousPage}
          />

          <div className="flex-grow space-y-4 w-full py-8 px-48 flex-col items-center flex justify-center">
            {isFetching && <LoadingSpinner />}

            {!isFetching && <PreviousOrdersList orders={data.previousOrders} />}
          </div>
        </div>
      )}

      {status === "pending" && <LoadingSpinner />}
    </div>
  );
}

function PreviousOrdersList({ orders }: { orders: PastOrder[] }) {
  return (
    <>
      {orders.map((item, i) => {
        return (
          <div
            key={i}
            className="w-full h-48 flex gap-x-2 border rounded-sm p-2"
          >
            <div className="overflow-hidden rounded-sm">
              <img src={item.product.image} alt="product image" />
            </div>

            <div className="p-2 space-y-2">
              <p className="text-2xl font-bold">{item.product.name}</p>

              <p className="text-sm">
                Ordered on : {new Date(item.created_at).toDateString()}
              </p>

              <p className="text-sm">Quantity : {item.quantity}</p>

              <p className="text-sm">
                Paid: ${item.quantity * item.product.price}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
