import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { AiFillProduct } from "react-icons/ai";

import { useLottie } from "lottie-react";
import animationData from "./lottie/Animation - 1731052331681.json";

import Button from "./components/Button";
import LoadingSpinner from "./components/LoadingSpinner";

import { cartStore } from "./lib/cartStore";
import { getUserInfo, logOutFn } from "./lib/data-service";

export default function Layout() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  //fetch the users profile
  const { data, status, isFetching } = useQuery({
    queryKey: ["user-info"],
    queryFn: getUserInfo,
  });

  //get the amount of items in the cart
  const cartQuantity = cartStore((state) => state.items.length);

  //lottie
  const { View, goToAndPlay } = useLottie(
    {
      animationData,
      loop: false,
      autoplay: false,
    },
    { height: 40, width: 40 }
  );

  //play the lottie everytime a new item gets added to cart
  useEffect(
    function () {
      goToAndPlay(0);
    },
    [cartQuantity, goToAndPlay]
  );

  //function to logout
  const { mutate, isPending } = useMutation({
    mutationFn: logOutFn,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-info"] });
      navigate("/");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className={"h-dvh flex flex-col"}>
      <nav className="flex justify-between items-center px-10 py-5">
        {status === "success" && !isFetching && (
          <NavLink viewTransition to="/profile">
            Welcome, <span>{data.last_name}</span>
          </NavLink>
        )}

        {isFetching && <LoadingSpinner size="20px" />}

        {status === "error" && !isFetching && (
          <NavLink viewTransition to={"/login"}>
            Log In
          </NavLink>
        )}

        <div className="flex gap-x-8 items-center">
          <NavLink className={"text-blue-500"} viewTransition to="/">
            <AiFillProduct className="text-3xl text-inherit" color="#52CC99" />
          </NavLink>

          <NavLink viewTransition to="/cart" className={"flex items-center"}>
            <span className="text-sm">{cartQuantity || null}</span>&nbsp;
            {View}
          </NavLink>

          {status === "success" && (
            <Button
              disabled={isPending || isFetching}
              onClickFn={() => mutate()}
            >
              Log Out
            </Button>
          )}
        </div>
      </nav>

      <div className="h-dvh py-4 px-10 ">
        <Outlet />
      </div>
    </div>
  );
}
