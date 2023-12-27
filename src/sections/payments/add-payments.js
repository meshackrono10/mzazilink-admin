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
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Card,
  CardHeader,
  Container,
  FormControl,
  SvgIcon,
  OutlinedInput,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { fetchData } from "src/utils/fetchData";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddPayment() {
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    cheque_number: "",
    amount: "",
  });
  const [purchaseOrderIdData, setPurchaseOrderIdData] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [selectedPurchaseOrderId, setSelectedPurchaseOrderId] = React.useState("");
  console.log();
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

  const handleProductSelection = (purchaseOrderId) => {
    setSelectedPurchaseOrderId(purchaseOrderId);
    setFormValues((prevValues) => ({
      ...prevValues,
      purchase_order_id: purchaseOrderId,
    }));
  };

  useEffect(() => {
    const fetchPurchaseOrdersData = async () => {
      const purchaseOrderIdData = await fetchData(
        "http://159.203.141.75:81/api/v1/school/procurement/purchase-orders/",
        {
          offset: page * rowsPerPage,
          per_page: rowsPerPage,
        }
      );
      setPurchaseOrderIdData(purchaseOrderIdData);
    };

    fetchPurchaseOrdersData();
  }, [page, rowsPerPage]);

  const handleSubmit = async () => {
    try {
      // Get the token from local storage
      const storedToken = localStorage.getItem("token").toString();

      // Data to be posted
      const postData = {
        cheque_number: formValues.cheque_number,
        purchase_order_id: selectedPurchaseOrderId,
        amount: formValues.amount,
      };

      // Make a POST request with the data
      const response = await axios.post(
        "http://159.203.141.75:81/api/v1/school/procurement/new-payment/",
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
      window.location.reload();
      handleClose();
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

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
        Add Payment
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
                  subheader="Fill in all the inputs to be able to create a payment"
                  title="Create a payment "
                />
                <Divider />
              </Box>
              <Box sx={{ width: "50%", minWidth: "400px" }}>
                {[
                  {
                    labelName: "Cheque Number",
                    placeholder: "",
                    field: "cheque_number",
                  },
                  { labelName: "Amount", placeholder: "", field: "amount" },
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
                      <FormControl sx={{ width: "100%" }}>
                        <OutlinedInput
                          defaultValue=""
                          fullWidth
                          onChange={(e) => handleInputChange(inputField.field, e.target.value)}
                        />
                      </FormControl>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}

                <ListItem>
                  <FormControl fullWidth>
                    <p>
                      Purchase Order Number
                      <span style={{ color: "red", marginLeft: "5px" }}>* </span>
                    </p>

                    <Select
                      labelId="Purchase-Order-Number-select-label"
                      id="Purchase Order Number-select"
                      label="Purchase Order Number"
                      value={selectedPurchaseOrderId}
                      onChange={(e) => handleProductSelection(e.target.value)}
                    >
                      {purchaseOrderIdData.map((data, index) => (
                        <MenuItem key={index} value={data.id}>
                          {data.order_number}
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
