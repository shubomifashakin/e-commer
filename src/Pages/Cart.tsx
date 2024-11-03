import { cartStore } from "../lib/cartStore";
import { CartItem } from "../lib/type";

export default function Page() {
  const { items } = cartStore((state) => state);

  //calculate the total price of all items in cart
  const totalPrice = items.reduce((prev, curr) => {
    return prev + curr.price * curr.quantity;
  }, 0);

  return (
    <form className="w-full  flex flex-col overflow-hidden ">
      <div className="py-4 px-10 w-full overflow-y-auto  space-y-5">
        {items.map((item, index) => {
          return <Item item={item} key={index} />;
        })}

        <button
          className="text-center w-full rounded-sm p-2 border"
          type="button"
        >
          Pay ${totalPrice}
        </button>
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
        <img alt="an image" className="object-cover h-full" src={item.image} />
      </div>

      <div className="space-y-2">
        <p className="text-lg font-bold">Product : {item.name}</p>

        <p className="text-sm">Quantity : {item.quantity}</p>

        <p className="text-sm">Total : ${item.quantity * item.price}</p>

        <div className="space-x-2">
          <button
            className="border w-6 p-1 aspect-square hover:bg-blue-500 duration-500 transition-colors"
            type="button"
            onClick={() => decrementItemQuantity(item.id)}
          >
            -
          </button>

          <span className="text-center p-1 px-2 bg-primary border w-fit justify-center">
            {item.quantity}
          </span>

          <button
            className="border w-6 p-1 aspect-square hover:bg-blue-500 duration-500 transition-colors"
            type="button"
            onClick={() => incrementItemQuantity(item.id)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
