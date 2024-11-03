import { useQuery } from "@tanstack/react-query";
import { NavLink, Outlet } from "react-router-dom";
import { getUserInfo } from "./lib/data-service";
import { cartStore } from "./lib/cartStore";
import { useEffect } from "react";

export default function Layout() {
  //fetch user info
  const { status, data, error } = useQuery({
    queryKey: ["userinfo"],
    queryFn: getUserInfo,
  });

  //get the amount ofitems in cart
  const cartQuantity = cartStore((state) => state.items.length);

  //set up a useeffect to run anytime the cartquantity changes
  useEffect(function () {}, [cartQuantity]);

  return (
    <div className={"h-dvh flex flex-col"}>
      <nav className="flex justify-between p-6">
        <NavLink to="/profile">
          Welcome&nbsp;
          {status === "pending" && "Loading"}
          {status === "success" && <span>{data[0].lastName}</span>}
          {status === "error" && "error"}
        </NavLink>

        <div className="flex gap-x-5">
          {/* change to icons, lottie for the cart */}
          <NavLink to="/catalog">Catalog</NavLink>

          <NavLink to="/cart">Cart {cartQuantity}</NavLink>

          <NavLink to="/logOut">Log Out</NavLink>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}
