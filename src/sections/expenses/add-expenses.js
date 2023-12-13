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
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  SvgIcon,
  OutlinedInput,
} from "@mui/material";
import MaxHeightTextarea from "src/components/textArea";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddExpenses() {
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    amount: "",
    date_of_expense: "",
    expense_type: "",
    notes: "",
    spent_by: "",
  });

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

  const handleSubmit = async () => {
    try {
      // Get the token from local storage
      const storedToken = localStorage.getItem("token").toString();

      // Data to be posted
      const postData = {
        amount: formValues.amount,
        date_of_expense: formValues.date_of_expense,
        expense_type: formValues.expense_type,
        notes: formValues.notes,
        spent_by: formValues.spent_by,
        product_id: formValues.product_id,
        supplier_id: formValues.supplier_id,
      };

      // Make a POST request with the data
      const response = await axios.post(
        "http://159.203.141.75:81/api/v1/school/procurement/new-expense/",
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
        Add Expenses
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
                  subheader="Fill in all the inputs to be able to create an expense"
                  title="Create purchase expense"
                />
                <Divider />
              </Box>
              <Box sx={{ width: "50%", minWidth: "400px" }}>
                {[
                  { labelName: "Amount", placeholder: "", field: "amount" },
                  { labelName: "Date Of Expense", placeholder: "", field: "date_of_expense" },
                  {
                    labelName: "Expense Type",
                    placeholder: "",
                    field: "expense_type",
                  },
                  {
                    labelName: "Notes",
                    placeholder: "",
                    field: "notes",
                  },
                  { labelName: "Spent By", placeholder: "", field: "spent_by" },
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
                        <MaxHeightTextarea
                          onChange={(e) => handleInputChange(inputField.field, e.target.value)}
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
                {/* 
                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "start",
                  }}
                >
                  <p>
                    <span style={{ color: "red" }}>* </span>Is active
                  </p>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-label">Select</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Is Active"
                      onChange={(e) => handleInputChange("isActive", e.target.value)}
                    >
                      <MenuItem value="true">True</MenuItem>
                      <MenuItem value="false">False</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
                <Divider />

                {[{ labelName: "Are Contacts Valid" }, { labelName: "Is active" }].map(
                  (selectField, index) => (
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
                          {selectField.labelName}
                        </p>
                        <FormControl sx={{ width: "100%" }}>
                          <InputLabel id="demo-simple-select-label">select</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label={selectField.labelName}
                            onChange={(e) => handleInputChange(selectField.field, e.target.value)}
                          >
                            <MenuItem value="true">True</MenuItem>
                            <MenuItem value="false">False</MenuItem>
                          </Select>
                        </FormControl>
                      </ListItem>
                    </React.Fragment>
                  )
                )} */}

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
