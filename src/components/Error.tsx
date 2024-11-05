export default function Error({
  error,
  isFetching,
  refetchFn,
}: {
  isFetching: boolean;
  refetchFn: () => void;
  error: Error;
}) {
  return (
    <div className="space-y-2 text-center border rounded-sm p-2">
      <p>{error.message}</p>

      <button
        className="border p-1 rounded-sm"
        disabled={isFetching}
        type="button"
        onClick={() => refetchFn()}
      >
        Try Again
      </button>
    </div>
  );
}
