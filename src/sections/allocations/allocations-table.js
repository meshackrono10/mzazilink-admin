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
import { getInitials } from "src/utils/get-initials";

export const AllocationTable = (props) => {
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
                <TableCell>To Department</TableCell>
                <TableCell>From Department </TableCell>
                <TableCell>Quantity </TableCell>
                <TableCell>Student</TableCell>
                <TableCell>Initiated By</TableCell>
                <TableCell>Product</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((allocation) => {
                const isSelected = selected.includes(allocation.id);
                const { product, student, timestamp, quantity, notes, date_added, allocated_by } =
                  allocation;
                const createdAt = format(new Date(date_added), "dd/MM/yyyy");

                return (
                  <TableRow hover key={allocation.id} selected={isSelected}>
                    <TableCell>
                      {/* Add rendering logic for 'To Department' */} {allocated_by}
                    </TableCell>
                    <TableCell>{/* Add rendering logic for 'From Department' */}</TableCell>
                    <TableCell>{quantity}</TableCell>
                    <TableCell>{student?.student_name}</TableCell>
                    <TableCell>{allocated_by.full_name}</TableCell>
                    <TableCell>{product.item_name}</TableCell>
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

AllocationTable.propTypes = {
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
