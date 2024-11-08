import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingSpinner({ size = "25px" }: { size?: string }) {
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <CircularProgress size={size} color="primary" />
    </Stack>
  );
}
