import { CatalogResults, UserInfo } from "./type";

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
