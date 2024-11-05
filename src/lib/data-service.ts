import {
  CatalogResults,
  logInDetailsTypes,
  logInDetailsValidator,
  signUpDetailsValidator,
  signUpDetailsTypes,
  UserInfo,
  placeOrderValidator,
  CartItem,
} from "./type";

const origin = "http://localhost:3000";

//getters
export async function getUserInfo(): Promise<UserInfo> {
  const req = await fetch(`${origin}/user`);

  if (!req.ok) {
    throw new Error(`An error occurred ${req.statusText}`);
  }

  const data = await req.json();

  return data;
}

export async function getCatalog(pageParams: number): Promise<CatalogResults> {
  const req = await fetch(`${origin}/products?cursor=${pageParams}`);

  if (!req.ok) {
    throw new Error(`An error occurred ${req.statusText}`);
  }

  const data = await req.json();

  return data;
}

export async function loginFunction(params: logInDetailsTypes) {
  logInDetailsValidator.parse(params);

  //try submitting the data
  const req = await fetch(`${origin}/login`, {
    method: "POST",
    body: JSON.stringify(params),
  });

  if (!req.ok) {
    throw new Error(`An Error occurred ${req.statusText}`);
  }

  await req.json();
}

export async function signUpFunction(params: signUpDetailsTypes) {
  //validate the data being sent
  signUpDetailsValidator.parse(params);

  const { email, password, firstName, lastName } = params;

  //try submitting the data
  const req = await fetch(`${origin}/user`, {
    method: "POST",
    body: JSON.stringify({ email, password, lastName, firstName }),
  });

  if (!req.ok) {
    throw new Error(`An Error occurred ${req.statusText}`);
  }

  await req.json();
}

export async function placeOrderFunction(params: CartItem[]) {
  //validate the data being sent
  placeOrderValidator.parse(params);

  //try submitting the data
  const req = await fetch(`${origin}/orders`, {
    method: "POST",
    body: JSON.stringify(params),
  });

  if (!req.ok) {
    throw new Error(`An Error occurred ${req.statusText}`);
  }

  await req.json();
}

export async function getSearchCatalog({
  search,
  cursor = 1,
}: {
  search: string;
  cursor?: number;
}): Promise<CatalogResults> {
  const req = await fetch(
    `${origin}/products?where=${search}&cursor=${cursor}`
  );

  if (!req.ok) {
    throw new Error(`An error occurred ${req.statusText}`);
  }

  const data = await req.json();

  return data;
}
