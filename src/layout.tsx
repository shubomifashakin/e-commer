import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AiFillProduct } from "react-icons/ai";
import toast from "react-hot-toast";

import { useLottie } from "lottie-react";
import animationData from "./lottie/Animation - 1731052331681.json";

import Button from "./components/Button";
import { useSession } from "./hooks/useSession";
import { cartStore } from "./lib/cartStore";
import { logOutFn } from "./lib/data-service";

export default function Layout() {
  const navigate = useNavigate();

  //gets the user session from the cookie
  const [userInfo, setUserInfo] = useSession();

  //get the amount ofitems in cart
  const cartQuantity = cartStore((state) => state.items.length);

  //lottie
  const { View, goToAndPlay } = useLottie(
    {
      animationData,
      loop: false,
      autoplay: false,
    },
    { height: 40, width: 40, color: "#fc3" }
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
      setUserInfo(null);
      navigate("/catalog");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className={"h-dvh flex flex-col"}>
      <nav className="flex justify-between items-center px-10 py-5">
        {userInfo ? (
          <NavLink viewTransition to="/profile">
            Welcome, <span>{userInfo.last_name}</span>
          </NavLink>
        ) : (
          <NavLink viewTransition to={"/login"}>
            Log In
          </NavLink>
        )}

        <div className="flex gap-x-8 items-center">
          {/* change to icons, lottie for the cart */}
          <NavLink className={"text-blue-500"} viewTransition to="/catalog">
            <AiFillProduct className="text-3xl text-inherit" color="#52CC99" />
          </NavLink>

          <NavLink viewTransition to="/cart" className={"flex items-center"}>
            <span className="text-sm">{cartQuantity || null}</span>&nbsp;
            {View}
          </NavLink>

          {userInfo && (
            <Button disabled={isPending} onClickFn={() => mutate()}>
              Log Out
            </Button>
          )}
        </div>
      </nav>

      <Outlet />
    </div>
  );
}
