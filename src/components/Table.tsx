import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TableComponent({ children }) {
  return (
    <TableContainer
      component={Paper}
      className="!bg-red-400 !border  !text-white"
    >
      <Table sx={{ minWidth: 500, color: "blue" }} aria-label="simple table">
        <TableHead
          className="!bg-blue-400 !text-white"
          sx={{ color: "yellow" }}
        >
          <TableRow sx={{ color: "green" }}>
            <TableCell align="center">Product</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Total</TableCell>
            <TableCell align="center">Date Ordered</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}
