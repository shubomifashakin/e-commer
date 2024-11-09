import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../lib/data-service";
import { UserInfo } from "../lib/type";
import { InputGroup } from "../components/InputGroup";
import Error from "../components/Error";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Page() {
  //fetch user info
  const { status, data, error, refetch, isFetching } = useQuery({
    queryKey: ["userinfo"],
    queryFn: getUserInfo,
  });

  return (
    <>
      {status === "pending" && (
        <div className="h-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      {status === "success" && <Profile data={data} />}

      {status === "error" && (
        <Error error={error} refetchFn={refetch} isFetching={isFetching} />
      )}
    </>
  );
}

function Profile({ data }: { data: UserInfo }) {
  return (
    <div className="px-10 space-y-10">
      <h2 className="text-3xl font-bold">Profile</h2>

      <div className="space-y-5 w-1/2">
        <InputGroup label={"Email"} value={data.email} disabled={true} />

        <InputGroup
          label="First Name"
          value={data.first_name}
          disabled={true}
        />

        <InputGroup label="Last Name" value={data.last_name} disabled={true} />
      </div>
    </div>
  );
}
