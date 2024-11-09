import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../lib/data-service";
import LoadingSpinner from "./LoadingSpinner";

export default function ProtectedRoute({
  children,
  redirectUrl,
}: {
  children: ReactNode;
  redirectUrl: string;
}) {
  const navigate = useNavigate();
  const { status, data } = useQuery({
    queryKey: ["user-info"],
    queryFn: getUserInfo,
  });

  //if there is no user info go back to login
  useEffect(
    function () {
      if (status === "error") {
        navigate(`/login?redirect_url=${encodeURIComponent(redirectUrl)}`);
      }
    },
    [status, redirectUrl, navigate, data]
  );

  if (status === "success") return children;

  if (status === "pending") {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return null;
}
