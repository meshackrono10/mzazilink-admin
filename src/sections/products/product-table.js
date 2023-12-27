import React, { useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Stack,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { useRouter } from "next/router";
import ProgressBars from "src/utils/loading";

export const ProductTable = (props) => {
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

  const [selectedProduct, setSelectedProduct] = useState(null);

  const isSelectedProduct = (productId) => {
    return selectedProduct && selectedProduct.id === productId;
  };

  const formatDate = (dateString) => format(new Date(dateString), "dd/MM/yyyy");

  return (
    <Card>
      <Scrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date Added</TableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
            <ProgressBars />
          ) : (
            <TableBody>
              {items.map((product) => {
                const isSelected = selected.includes(product.id);

                return (
                  <React.Fragment key={product.id}>
                    <TableRow
                      onClick={() => router.push(`/Products/product/${product.id}`)}
                      hover
                      selected={isSelected || isSelectedProduct(product.id)}
                    >
                      <TableCell></TableCell>
                      <TableCell>
                        <Stack
                          sx={{ height: "40px" }}
                          alignItems="center"
                          direction="row"
                          spacing={2}
                        >
                          <Typography variant="subtitle2">{product.item_name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{product.unit_price}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{formatDate(product.date_added)}</TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          )}
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
  isLoading: PropTypes.bool,
};
