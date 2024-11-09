import { useState } from "react";
import { UserInfo } from "../lib/type";

export function useSession(): [UserInfo | null, () => void] {
  //get the user info from session
  const [userInfo, setUserInfo] = useState(function (): UserInfo | null {
    const userInfo = localStorage.getItem("user-info");

    return userInfo ? JSON.parse(userInfo) : null;
  });

  function clearLocalStorage(): void {
    localStorage.removeItem("user-info");
    setUserInfo(null);
  }

  return [userInfo, clearLocalStorage];
}
