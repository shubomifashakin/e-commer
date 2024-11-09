import { flushSync } from "react-dom";
import { cartStore } from "../lib/cartStore";
import { Product } from "../lib/type";
import Button from "./Button";

export default function ProductCard({ details }: { details: Product }) {
  const { price, name, description, image, id } = details;

  //get the amount ofitems in cart
  const { addToCart, items } = cartStore((state) => state);

  const totalQuantityOfItemInCart =
    items.find((c) => c.id === id)?.quantity || 0;

  function addItemToCart() {
    document.startViewTransition(() => {
      flushSync(() => {
        addToCart(details);
      });
    });
  }

  return (
    <div className=" w-48 border bg-secondary space-y-1 h-80 p-2 rounded-sm">
      <div className="w-full overflow-hidden rounded-sm h-1/2">
        <img className="object-cover" src={image} alt="an image" />
      </div>

      <div className="flex flex-col justify-between h-1/2 py-2.5">
        <p className="text-sm">{name}</p>

        <p className="text-xs text-ellipsis text-nowrap overflow-hidden">
          {description}
        </p>

        <p className="text-xs">${price}</p>

        <Button onClickFn={addItemToCart} type={"button"}>
          Add To Cart{" "}
          {totalQuantityOfItemInCart ? `(${totalQuantityOfItemInCart}) ` : ""}
        </Button>
      </div>
    </div>
  );
}
