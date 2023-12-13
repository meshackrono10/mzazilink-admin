import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { useRouter } from "next/router";

export const PaymentTable = (props) => {
  const router = useRouter();

  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Processed By</TableCell>
                <TableCell>Cheque Number</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date Paid</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((payment) => {
                const isSelected = selected.includes(payment.id);
                const datePaid = format(new Date(payment.timestamp_paid * 1000), "dd/MM/yyyy");

                return (
                  <TableRow
                    onClick={() => router.push(`/Payments/payment/${payment.id}`)}
                    hover
                    key={payment.id}
                    selected={isSelected}
                  >
                    <TableCell>{payment.processed_by.full_name}</TableCell>
                    <TableCell>{payment.cheque_number}</TableCell>
                    <TableCell>{`Ksh. ${parseFloat(payment.amount).toFixed(2)}`}</TableCell>
                    <TableCell>{datePaid}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

PaymentTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
