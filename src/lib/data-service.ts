import {
  CatalogResults,
  logInDetailsTypes,
  logInDetailsValidator,
  signUpDetailsValidator,
  signUpDetailsTypes,
  UserInfo,
  placeOrderValidator,
  OrderItem,
  HistoryResult,
} from "./type";

const origin = import.meta.env.VITE_ORIGIN as string;

//getters
export async function getUserInfo(): Promise<UserInfo> {
  const req = await fetch(`${origin}/users/me`, { credentials: "include" });

  if (!req.ok) {
    throw new Error(`An error occurred ${req.statusText}`);
  }

  const data = await req.json();
  return data;
}

export async function getCatalog(pageParams: number): Promise<CatalogResults> {
  const req = await fetch(`${origin}/products?skip=${pageParams}`);

  if (!req.ok) {
    throw new Error(`An error occurred ${req.statusText}`);
  }

  const data = await req.json();

  return data;
}

export async function loginFunction(params: logInDetailsTypes) {
  //validate the params passed
  logInDetailsValidator.parse(params);

  //try submitting the data
  const req = await fetch(`${origin}/users/login`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  });

  if (!req.ok) {
    const message = await req.json();
    throw new Error(message);
  }
}

export async function signUpFunction(params: signUpDetailsTypes) {
  //validate the data being sent
  signUpDetailsValidator.parse(params);

  const { email, password, firstName, lastName } = params;

  //try submitting the data
  const req = await fetch(`${origin}/users/signup`, {
    method: "POST",
    body: JSON.stringify({ email, password, lastName, firstName }),
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  });

  if (!req.ok) {
    const message = await req.json();

    throw new Error(message);
  }
}

export async function logOutFn() {
  //try submitting the data
  const req = await fetch(`${origin}/users/logout`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  });

  if (!req.ok) {
    const message = await req.json();

    throw new Error(message);
  }

  await req.json();

  sessionStorage.removeItem("user-info");
}

export async function placeOrderFunction(params: OrderItem[]) {
  //validate the data being sent
  placeOrderValidator.parse(params);

  //try submitting the data
  const req = await fetch(`${origin}/orders`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  });

  if (!req.ok) {
    throw new Error(`An Error occurred ${req.statusText}`);
  }

  await req.json();
}

export async function getOrderHistory(
  pageParams: number
): Promise<HistoryResult> {
  //try submitting the data
  const req = await fetch(`${origin}/orders/history?skip=${pageParams}`, {
    method: "GET",
    credentials: "include",
  });

  if (!req.ok) {
    throw new Error(`An Error occurred ${req.statusText}`);
  }

  const data = await req.json();
  console.log(data);
  return data;
}

export async function getSearchCatalog({
  name,
  skip = 0,
}: {
  name: string;
  skip?: number;
}): Promise<CatalogResults> {
  const req = await fetch(`${origin}/products?name=${name}&skip=${skip}`);

  if (!req.ok) {
    throw new Error(`An error occurred ${req.statusText}`);
  }

  const data = await req.json();

  return data;
}
