//getters
export async function getUserInfo(): Promise<UserInfo> {
  const req = await fetch("http://localhost:3000/user");

  if (!req.ok) {
    throw new Error(`An error occurred ${req.statusText}`);
  }

  const data = await req.json();

  return data;
}

export async function getCatalog(pageParams: number): Promise<CatalogResults> {
  const req = await fetch(
    `http://localhost:3000/products?cursor=${pageParams}`
  );

  if (!req.ok) {
    throw new Error(`An error occurred ${req.statusText}`);
  }

  const data = await req.json();

  return data;
}

type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
};

export type Product = {
  name: string;
  price: number;
  image: string;
  id: string;
};

export type CatalogResults = {
  data: Product[];
  paginationDetails: {
    nextCursor: number;
  };
};
