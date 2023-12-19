import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
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
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Divider,
  ListItem,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import MaxHeightTextarea from "src/components/textArea";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { fetchData } from "src/utils/fetchData";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function AddAllocation() {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    notes: "",
    spent_by: "",
    product_id: "",
    to_department: "",
    student_number: "",
    quantity: "",
  });
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tabValue, setTabValue] = useState(0);
  const [productsData, setProductsData] = useState([]);
  const [selectedProductIdProductTab, setSelectedProductIdProductTab] = useState("");
  const [selectedProductIdStudentTab, setSelectedProductIdStudentTab] = useState("");
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleProductSelection = (productId) => {
    const selectedProduct = productsData.find((data) => data.product_id === productId);
    if (tabValue === 0) {
      setSelectedProductIdProductTab(productId);
      setSelectedItemName(selectedProduct ? selectedProduct.item_name : "");
    } else if (tabValue === 1) {
      setSelectedProductIdStudentTab(productId);
      setSelectedItemName(selectedProduct ? selectedProduct.item_name : "");
    }
  };

  useEffect(() => {
    const fetchStreamsData = async () => {
      const streamsData = await fetchData("http://159.203.141.75:81/api/v2/school/streams/", {
        form: "1",
      });
      setData(streamsData);
    };

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

    fetchStreamsData();
    fetchProductsData();
  }, [page, rowsPerPage]);

  const handleProductAllocationSubmit = async () => {
    try {
      const storedToken = localStorage.getItem("token").toString();

      const postData = {
        product_id: selectedProductIdProductTab,
        to_department: formValues.to_department,
        notes: formValues.notes,
        quantity: formValues.quantity,
        id: 0,
      };
      console.log(postData);
      await axios.post(
        "http://159.203.141.75:81/api/v1/school/procurement/new-allocation/",
        postData,
        {
          headers: {
            token: storedToken,
          },
        }
      );

      handleClose();
    } catch (error) {
      console.error("Error during product allocation submission:", error);
    }
  };

  const handleStudentAllocationSubmit = async () => {
    try {
      const storedToken = localStorage.getItem("token").toString();

      const postData = {
        student_number: formValues.student_number,
        product_id: selectedProductIdStudentTab,
        quantity: formValues.quantity,
      };
      console.log(postData);

      await axios.post(
        "http://159.203.141.75:81/api/v1/school/procurement/allocate-student/",
        postData,
        {
          headers: {
            token: storedToken,
          },
        }
      );

      handleClose();
    } catch (error) {
      console.error("Error during student allocation submission:", error);
    }
  };

  const handleTabChange = (_, newValue) => setTabValue(newValue);

  return (
    <>
      <Button
        startIcon={<PlusIcon fontSize="small" />}
        variant="contained"
        onClick={handleClickOpen}
      >
        Add Allocation
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
        <Tabs
          sx={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            marginLeft: "3rem",
            marginTop: "3rem",
          }}
          value={tabValue}
          onChange={handleTabChange}
          aria-label="simple tabs example"
        >
          <Tab sx={{ minWidth: "500px" }} label="New Product Allocation" />
          <Tab sx={{ minWidth: "500px" }} label="New Student Allocation" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          {/* New Product Allocation Form */}
          <Container sx={{ marginTop: "1rem" }}>
            <Card sx={{ p: 2, display: "flex", flexWrap: "wrap" }}>
              <Box sx={{ width: "50%" }}>
                <CardHeader
                  subheader="Fill in all the inputs to be able to create an allocation"
                  title="Create new product allocation"
                />
                <Divider />
              </Box>
              <Box sx={{ width: "50%", minWidth: "400px" }}>
                {[
                  {
                    labelName: "To Department",
                    placeholder: "",
                    field: "to_department",
                  },

                  { labelName: "Quantity", placeholder: "", field: "quantity" },
                  {
                    labelName: "Notes",
                    placeholder: "",
                    field: "notes",
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
                        <span style={{ color: "red" }}>* </span>
                        {inputField.labelName}
                      </p>
                      {inputField.labelName === "Notes" ? (
                        <TextField
                          id="standard-multiline-flexible"
                          placeholder={inputField.placeholder}
                          multiline
                          minRows={4}
                          maxRows={6}
                          variant="outlined"
                          value={formValues[inputField.field]}
                          onChange={(e) => handleInputChange(inputField.field, e.target.value)}
                          style={{ width: "100%" }}
                        />
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
                {/* productsData */}
                <ListItem>
                  <FormControl fullWidth>
                    <InputLabel id="student-select-label">
                      {"Products" || selectedProductIdProductTab}
                    </InputLabel>
                    <Select
                      labelId="student-select-label"
                      id="student-select"
                      label="Products"
                      value={selectedProductIdProductTab}
                      onChange={(e) => handleProductSelection(e.target.value)}
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
                    onClick={handleProductAllocationSubmit}
                    sx={{ width: "100%", marginRight: "5px" }}
                    variant="contained"
                  >
                    Submit
                  </Button>
                </ListItem>
              </Box>
            </Card>
          </Container>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {/* New Student Allocation Form */}
          <Container sx={{ marginTop: "1rem" }}>
            <Card sx={{ p: 2, display: "flex", flexWrap: "wrap" }}>
              <Box sx={{ width: "50%" }}>
                <CardHeader
                  subheader="Fill in all the inputs to be able to create a student allocation"
                  title="Create new student allocation"
                />
                <Divider />
              </Box>
              <Box sx={{ width: "50%", minWidth: "400px" }}>
                {[
                  { labelName: "SEARCH STUDENT", placeholder: "", field: "student_number" },
                  { labelName: "Quantity", placeholder: "", field: "quantity" },
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
                        <span style={{ color: "red" }}>* </span>
                        {inputField.labelName}
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
                ))}{" "}
                <ListItem>
                  <FormControl fullWidth>
                    <InputLabel id="student-select-label">
                      {"Products" || selectedProductIdStudentTab}
                    </InputLabel>
                    <Select
                      labelId="student-select-label"
                      id="student-select"
                      label="Products"
                      value={selectedProductIdStudentTab}
                      onChange={(e) => handleProductSelection(e.target.value)}
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
                    onClick={handleStudentAllocationSubmit}
                    sx={{ width: "100%", marginRight: "5px" }}
                    variant="contained"
                  >
                    Submit
                  </Button>
                </ListItem>
              </Box>
            </Card>
          </Container>
        </TabPanel>
      </Dialog>
    </>
  );
}
