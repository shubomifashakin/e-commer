import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavLink, Outlet } from "react-router-dom";

import { getUserInfo } from "./lib/data-service";
import { cartStore } from "./lib/cartStore";

import { useSession } from "./hooks/useSession";

export default function Layout() {
  //fetch user info
  const { status, data } = useQuery({
    queryKey: ["userinfo"],
    queryFn: getUserInfo,
  });

  //gets the user session from the cookie
  const sessionToken = useSession();

  //get the amount ofitems in cart
  const cartQuantity = cartStore((state) => state.items.length);

  //set up a useeffect to run anytime the cartquantity changes
  useEffect(function () {}, [cartQuantity]);

  return (
    <div className={"h-dvh flex flex-col"}>
      <nav className="flex justify-between px-10 py-5">
        {sessionToken ? (
          <NavLink viewTransition to="/profile">
            Welcome&nbsp;
            {status === "pending" && "Loading"}
            {status === "success" && <span>{data.lastName}</span>}
          </NavLink>
        ) : (
          <NavLink viewTransition to={"/login"}>
            Log In
          </NavLink>
        )}

        <div className="flex gap-x-8">
          {/* change to icons, lottie for the cart */}
          <NavLink viewTransition to="/catalog">
            Catalog
          </NavLink>

          <NavLink viewTransition to="/cart">
            Cart {cartQuantity || ""}
          </NavLink>

          {sessionToken && <NavLink to="/logOut">Log Out</NavLink>}
        </div>
      </nav>

      <Outlet />
    </div>
  );
}
