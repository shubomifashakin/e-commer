import { FormEvent } from "react";
import { flushSync } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import { cartStore } from "../lib/cartStore";
import { CartItem, OrderItem } from "../lib/type";
import { getUserInfo, placeOrderFunction } from "../lib/data-service";

import Button from "../components/Button";
import { toast } from "react-hot-toast";

export default function Page() {
  const navigate = useNavigate();

  //fetches the users info
  const { status } = useQuery({
    queryKey: ["user-info"],
    queryFn: getUserInfo,
  });

  //gets all the items from the cart
  const { items, clearCart } = cartStore((state) => state);

  //calculates the total price of all items in cart
  const totalPrice = items.reduce((prev, curr) => {
    return prev + curr.price * curr.quantity;
  }, 0);

  //function to place the order
  const { mutate, isPending } = useMutation({
    mutationFn: placeOrderFunction,

    onSuccess: () => {
      //go back to catalog page
      document.startViewTransition(() => {
        flushSync(() => {
          //clear the cart
          clearCart();

          navigate(`/catalog`);
        });
      });

      //show a toast that the order was successful
      toast.success("Order Successfully Placed");
    },
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //if there is no userinfo, user should login
    if (status !== "success") {
      navigate("/login?redirect_url=cart");
      return;
    }

    //get the required information for the order
    const itemsOrdered: OrderItem[] = items.map((c) => {
      return {
        product_id: c.id,
        quantity: c.quantity,
      };
    });

    mutate(itemsOrdered);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col overflow-hidden"
    >
      <div className="py-4 px-10 w-full overflow-y-auto space-y-2">
        {items.length ? (
          <div className="space-y-5">
            {items.map((item, index) => {
              return <Item item={item} key={index} />;
            })}

            <Button title="pay" disabled={isPending} type="submit">
              Pay ${totalPrice}
            </Button>
          </div>
        ) : (
          <p className="text-center text-sm">
            You do not have any items in cart!
          </p>
        )}

        {status === "success" && (
          <Link
            viewTransition
            className="text-xs underline text-center w-full block"
            to={"/orders/history"}
          >
            View Past Orders
          </Link>
        )}
      </div>
    </form>
  );
}

function Item({ item }: { item: CartItem }) {
  const { incrementItemQuantity, decrementItemQuantity } = cartStore(
    (state) => state
  );

  return (
    <div className="flex bg-secondary h-44 p-2 gap-x-4 w-full border rounded-sm">
      <div className="h-full rounded-sm overflow-hidden aspect-square">
        <img alt={item.name} className="object-cover h-full" src={item.image} />
      </div>

      <div className="space-y-2">
        <p className="text-lg font-bold">Product : {item.name}</p>

        <p className="text-sm">Quantity : {item.quantity}</p>

        <p className="text-sm">Total : ${item.quantity * item.price}</p>

        <div className="space-x-2">
          <button
            className="border w-6 p-1 aspect-square hover:bg-blue-500 duration-500 transition-colors"
            type="button"
            onClick={() =>
              document.startViewTransition(() => {
                flushSync(() => {
                  decrementItemQuantity(item.id);
                });
              })
            }
          >
            -
          </button>

          <span className="text-center p-1 px-2 bg-primary border w-fit justify-center">
            {item.quantity}
          </span>

          <button
            className="border w-6 p-1 aspect-square hover:bg-blue-500 duration-500 transition-colors"
            type="button"
            onClick={() =>
              document.startViewTransition(() => {
                flushSync(() => {
                  incrementItemQuantity(item.id);
                });
              })
            }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
