// SuppliersTable component
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Box,
  Card,
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
import { useRouter } from "next/router";
import ProgressBars from "src/utils/loading";

export const SuppliersTable = (props) => {
  const router = useRouter();
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    isLoading = false,
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Company Registration Number</TableCell>
                <TableCell>Date Registered</TableCell>
              </TableRow>
            </TableHead>
            {isLoading ? (
              <ProgressBars />
            ) : (
              <TableBody>
                {items.map((supplier) => {
                  const isSelected = selected.includes(supplier.id);
                  const dateRegistered = format(new Date(supplier.date_registered), "dd/MM/yyyy");
                  return (
                    <TableRow
                      hover
                      key={supplier.id}
                      selected={isSelected}
                      onClick={() => router.push(`/supply/supplier/${supplier.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell></TableCell>
                      <TableCell>
                        <Stack
                          sx={{ height: "40px" }}
                          alignItems="center"
                          direction="row"
                          spacing={2}
                        >
                          <Typography variant="subtitle2">{supplier.full_name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{supplier.phone_number}</TableCell>
                      <TableCell>{supplier.company_name}</TableCell>
                      <TableCell>{supplier.company_registration_number}</TableCell>
                      <TableCell>{dateRegistered}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
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

SuppliersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  isLoading: PropTypes.bool,
};
