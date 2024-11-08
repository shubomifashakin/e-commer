import Button from "./Button";

export default function Pagination({
  fetchNextPage,
  hasNextPage,
  hasPreviousPage,
  fetchPreviousPage,
  isPending,
}: PaginationType) {
  return (
    <>
      {(hasNextPage || hasPreviousPage) && (
        <div className="flex gap-x-3 py-2 justify-center">
          {hasPreviousPage && (
            <Button
              disabled={isPending}
              title="previous"
              size="sm"
              type="button"
              showSpinner={false}
              onClickFn={fetchPreviousPage}
            >
              &lt;
            </Button>
          )}

          {hasNextPage && (
            <Button
              disabled={isPending}
              title="next"
              size="sm"
              type="button"
              showSpinner={false}
              onClickFn={fetchNextPage}
            >
              &gt;
            </Button>
          )}
        </div>
      )}
    </>
  );
}

interface PaginationType {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
  isPending: boolean;
}
