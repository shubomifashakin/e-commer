import { useState } from "react";
import { UserInfo } from "../lib/type";

export function useSession():
  | [UserInfo | null, React.Dispatch<React.SetStateAction<UserInfo | null>>] {
  //get the user info from session
  const state = useState(function (): UserInfo | null {
    const userInfo = sessionStorage.getItem("user-info");

    return userInfo ? JSON.parse(userInfo) : null;
  });

  return state;
}
