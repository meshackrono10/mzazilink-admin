import React, { useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  TextField,
  Button,
  Stack,
  Container,
  Grid,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const ProductTable = (props) => {
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

  const [show, setShow] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  const handleShowDetails = (customer) => {
    setShow(!show);
    setSelectedCustomer(show ? null : customer);
  };

  const isSelectedCustomer = (customerId) => {
    return selectedCustomer && selectedCustomer.id === customerId;
  };

  const createdAt = (date) => format(date, "dd/MM/yyyy");

  return (
    <Card>
      <Scrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Physical Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Date Registered</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((customer) => {
              const isSelected = selected.includes(customer.id);

              return (
                <React.Fragment key={customer.id}>
                  <TableRow hover selected={isSelected || isSelectedCustomer(customer.id)}>
                    <TableCell onClick={() => handleShowDetails(customer)} padding="checkbox">
                      {show && isSelectedCustomer(customer.id) ? (
                        <IconButton size="small">
                          <KeyboardArrowDownIcon />
                        </IconButton>
                      ) : (
                        <IconButton size="small">
                          <KeyboardArrowRightIcon />
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <img
                          style={{ objectFit: "contain", width: "100px", borderRadius: "5px" }}
                          src={customer.avatar}
                          alt=""
                        />
                        <Typography variant="subtitle2">{customer.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                      {customer.address.city}, {customer.address.state}, {customer.address.country}
                    </TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{createdAt(customer.createdAt)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Collapse
                        in={show && isSelectedCustomer(customer.id)}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Container sx={{ marginTop: "1rem" }} maxWidth="xl">
                          <Grid container spacing={3}>
                            <Grid xs={12} sm={6} lg={3}>
                              <Card sx={{ padding: "15px" }}>
                                <TextField label="New Value 1" fullWidth />
                              </Card>
                            </Grid>
                            <Grid xs={12} sm={6} lg={3}>
                              <Card sx={{ padding: "15px" }}>
                                <TextField label="New Value 2" fullWidth />
                              </Card>
                            </Grid>
                            <Stack
                              sx={{ padding: "15px" }}
                              alignItems="center"
                              direction="row"
                              spacing={1}
                            >
                              <Button variant="contained" onClick={() => handleUpdate(customer)}>
                                Update
                              </Button>
                              <Button variant="outlined">Cancel</Button>
                            </Stack>
                          </Grid>
                        </Container>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
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

ProductTable.propTypes = {
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
