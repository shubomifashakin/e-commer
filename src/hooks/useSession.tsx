export function useSession() {
  //get the cookies from browser
  const cookies = document.cookie;

  const allCookies = cookies.split("; ").map((cookie) => {
    const [key, value] = cookie.split("=");

    return { key, value };
  });

  return allCookies.find((c) => {
    return c.key === "auth-session";
  });
}
