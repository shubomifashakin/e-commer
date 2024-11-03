import { Product } from "../lib/type";
import ProductCard from "./ProductCar";

export default function Catalog({ catalog }: { catalog: Product[] }) {
  return (
    <div className="grid grid-rows-1 items-center grid-cols-5 justify-between gap-12">
      {catalog.map((product, i) => {
        return <ProductCard key={i} details={product} />;
      })}
    </div>
  );
}
