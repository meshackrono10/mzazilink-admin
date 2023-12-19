import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Box, Card, CardHeader, Container, SvgIcon } from "@mui/material";
import axios from "axios";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useState, useEffect } from "react";
import { fetchData } from "src/utils/fetchData";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddPurchaseOrders() {
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    order_number: "",
    mode_of_payment: "",
    requesting_department: "",
    notes: "",
    expected_by_date: "",
  });
  const [productsData, setProductsData] = useState([]);
  const [suppliersData, setSuppliersData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [selectedProductIdProduct, setSelectedProductIdProduct] = useState("");
  const [selectedSupplierId, setSelectedSupplierId] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleProductSelection = (productId, type) => {
    const selectedProduct = productsData.find((data) => data.id === productId);
    const selectedSupplier = suppliersData.find((data) => data.id === productId);

    if (type === "product") {
      setSelectedProductIdProduct(productId);
      setFormValues((prevValues) => ({
        ...prevValues,
        product_id: productId,
      }));
    } else if (type === "supplier") {
      setSelectedSupplierId(productId);
      setFormValues((prevValues) => ({
        ...prevValues,
        supplier_id: productId,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      // Get the token from local storage
      const storedToken = localStorage.getItem("token").toString();

      // Data to be posted
      const postData = {
        order_number: formValues.order_number,
        mode_of_payment: formValues.mode_of_payment,
        requesting_department: formValues.requesting_department,
        notes: formValues.notes,
        expected_by_date: formValues.expected_by_date,
        product_id: selectedProductIdProduct,
        supplier_id: selectedSupplierId,
      };
      console.log(postData);

      // Make a POST request with the data
      const response = await axios.post(
        "http://159.203.141.75:81/api/v1/school/procurement/new-order/",
        postData,
        {
          headers: {
            token: storedToken,
          },
        }
      );

      // Handle the response as needed
      console.log("Response:", response);

      // Close the dialog
      handleClose();
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  useEffect(() => {
    const fetchProductsData = async () => {
      const productsData = await fetchData(
        "http://159.203.141.75:81/api/v1/school/procurement/products/",
        {
          offset: page * rowsPerPage,
          per_page: rowsPerPage,
        }
      );
      setProductsData(productsData);
    };
    const fetchSuppliersData = async () => {
      const productsData = await fetchData(
        "http://159.203.141.75:81/api/v1/school/procurement/suppliers/",
        {
          offset: page * rowsPerPage,
          per_page: rowsPerPage,
        }
      );
      setSuppliersData(productsData);
    };
    fetchSuppliersData();
    fetchProductsData();
  }, [page, rowsPerPage]);

  return (
    <React.Fragment>
      <Button
        startIcon={
          <SvgIcon fontSize="small">
            <PlusIcon />
          </SvgIcon>
        }
        variant="contained"
        onClick={handleClickOpen}
      >
        Add Purchase Orders
      </Button>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {/* form */}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <Container sx={{ marginTop: "1rem" }}>
            <Card sx={{ p: 2, display: "flex", flexWrap: "wrap" }}>
              <Box sx={{ width: "50%" }}>
                <CardHeader
                  subheader="Fill in all the inputs to be able to create a purchase orders"
                  title="Create purchase orders"
                />
                <Divider />
              </Box>
              <Box sx={{ width: "50%", minWidth: "400px" }}>
                {[
                  { labelName: "Order Number", placeholder: "", field: "order_number" },
                  { labelName: "Mode Of Payment", placeholder: "", field: "mode_of_payment" },
                  {
                    labelName: "Requesting Department",
                    placeholder: "",
                    field: "requesting_department",
                  },
                  { labelName: "Notes", placeholder: "", field: "notes" },
                  {
                    labelName: "Expected By Date",
                    type: "date",
                    placeholder: "",
                    field: "expected_by_date",
                  },
                ].map((inputField, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "start",
                      }}
                    >
                      <p>
                        {inputField.labelName}
                        <span style={{ color: "red", marginLeft: "5px" }}>* </span>
                      </p>
                      {inputField.labelName === "Notes" ? (
                        <TextField
                          multiline
                          minRows={4}
                          maxRows={6}
                          variant="outlined"
                          onChange={(e) => handleInputChange(inputField.field, e.target.value)}
                          style={{ width: "100%" }}
                        />
                      ) : inputField.type === "date" ? (
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            type="date"
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(e) => handleInputChange(inputField.field, e.target.value)}
                          />
                        </FormControl>
                      ) : (
                        <FormControl sx={{ width: "100%" }}>
                          <OutlinedInput
                            defaultValue=""
                            fullWidth
                            onChange={(e) => handleInputChange(inputField.field, e.target.value)}
                          />
                        </FormControl>
                      )}
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
                <ListItem>
                  <FormControl fullWidth>
                    <p>
                      Supplier
                      <span style={{ color: "red", marginLeft: "5px" }}>* </span>
                    </p>
                    <Select
                      labelId="supplier-select-label"
                      id="supplier-select"
                      label="Suppliers"
                      value={selectedSupplierId}
                      onChange={(e) => handleProductSelection(e.target.value, "supplier")}
                    >
                      {suppliersData.map((data, index) => (
                        <MenuItem key={index} value={data.id}>
                          {data.full_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </ListItem>
                <ListItem>
                  <FormControl fullWidth>
                    <p>
                      Product
                      <span style={{ color: "red", marginLeft: "5px" }}>* </span>
                    </p>
                    <Select
                      labelId="product-select-label"
                      id="product-select"
                      label="Products"
                      value={selectedProductIdProduct}
                      onChange={(e) => handleProductSelection(e.target.value, "product")}
                    >
                      {productsData.map((data, index) => (
                        <MenuItem key={index} value={data.id}>
                          {data.item_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </ListItem>

                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "start",
                  }}
                >
                  <Button
                    sx={{ width: "100%", marginRight: "5px" }}
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </ListItem>
              </Box>
            </Card>
          </Container>
        </List>
      </Dialog>
    </React.Fragment>
  );
}
