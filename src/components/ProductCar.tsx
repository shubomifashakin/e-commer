import { cartStore } from "../lib/cartStore";
import { Product } from "../lib/type";

export default function ProductCard({ details }: { details: Product }) {
  const { price, name, description, image, id } = details;

  //get the amount ofitems in cart
  const { addToCart, items } = cartStore((state) => state);

  const totalQuantityOfItemInCart =
    items.find((c) => c.id === id)?.quantity || 0;

  return (
    <div className=" w-48 border bg-secondary space-y-1 h-fit p-2 rounded-sm">
      <div className="w-full overflow-hidden rounded-sm h-1/2">
        <img className="object-cover" src={image} alt="an image" />
      </div>

      <div className="space-y-2.5">
        <p className="text-sm">{name}</p>

        <p className="text-xs">{description}</p>

        <p className="text-xs">${price}</p>

        <button
          type="button"
          className="text-xs py-2 hover:bg-white hover:text-black font-semibold transition-all duration-500 w-full border rounded-sm p-1"
          onClick={() => addToCart(details)}
        >
          Add To Cart{" "}
          {totalQuantityOfItemInCart ? `(${totalQuantityOfItemInCart}) ` : ""}
        </button>
      </div>
    </div>
  );
}
