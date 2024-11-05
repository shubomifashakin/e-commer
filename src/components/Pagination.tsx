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
        <div className="flex gap-x-3 justify-end">
          {hasPreviousPage && (
            <Button
              disabled={isPending}
              title="previous"
              size="sm"
              type="button"
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
