// PurchaseOrdersTable component
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import { useRouter } from "next/router";
import ProgressBars from "src/utils/loading";

const statusMap = {
  PENDING: "warning",
  DELIVERED: "success",
  // Add more status mappings as needed
};

export const PurchaseOrdersTable = (props) => {
  const router = useRouter();

  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    isLoading = false,
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
                <TableCell></TableCell>
                <TableCell>Order Number</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Requesting Department</TableCell>
                <TableCell>As Delivered</TableCell>
                <TableCell>Expected By</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {!isLoading ? (
                <ProgressBars />
              ) : (
                <>
                  {items.map((order) => {
                    const isSelected = selected.includes(order.id);
                    const expectedByDate = format(new Date(order.expected_by_date), "dd/MM/yyyy");

                    return (
                      <TableRow
                        onClick={() => router.push(`/purchaseOrders/purchaseOrders/${order.id}`)}
                        hover
                        key={order.id}
                        selected={isSelected}
                      >
                        <TableCell></TableCell>
                        <TableCell>{order.order_number}</TableCell>
                        <TableCell>{order.supplier.full_name}</TableCell>
                        <TableCell>{order.requesting_department}</TableCell>
                        <TableCell>
                          <SeverityPill color={statusMap[order.delivery_status]}>
                            {order.delivery_status}
                          </SeverityPill>
                        </TableCell>
                        <TableCell>{expectedByDate}</TableCell>
                      </TableRow>
                    );
                  })}
                </>
              )}
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

PurchaseOrdersTable.propTypes = {
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
  isLoading: PropTypes.bool,
};
