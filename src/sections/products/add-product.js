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
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import MaxHeightTextarea from "src/components/textArea";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddProduct() {
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    unit_price: "",
    item_name: "",
    unit_of_measurement: "",
    notes: "",
    is_consumable: false,
    item_number: "",
    category: "",
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
        unit_price: formValues.unit_price,
        item_name: formValues.item_name,
        unit_of_measurement: formValues.unit_of_measurement,
        notes: formValues.notes,
        is_consumable: formValues.is_consumable,
        item_number: formValues.item_number,
        category: formValues.category,
      };

      console.log(postData);
      // Make a POST request with the data
      const response = await axios.post(
        "http://159.203.141.75:81/api/v1/school/procurement/new-product/",
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
        Add a product
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
                  { labelName: "Unit Price", placeholder: "", field: "unit_price" },
                  { labelName: "Item Name", placeholder: "", field: "item_name" },
                  {
                    labelName: "Unit Of Measurement",
                    placeholder: "",
                    field: "unit_of_measurement",
                  },
                  { labelName: "Notes", placeholder: "", field: "notes" },
                  {
                    labelName: "Is Consumable",
                    placeholder: "",
                    field: "is_consumable",
                    type: "radio",
                    options: [
                      { label: "Yes", value: true },
                      { label: "No", value: false },
                    ],
                  },
                  { labelName: "Item Number", placeholder: "", field: "item_number" },
                  { labelName: "Category", placeholder: "", field: "category" },
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
                      {inputField.type === "radio" ? (
                        <FormControl component="fieldset">
                          <RadioGroup
                            row
                            value={formValues[inputField.field]}
                            onChange={(e) => handleInputChange(inputField.field, e.target.value)}
                          >
                            {inputField.options.map((option, optionIndex) => (
                              <FormControlLabel
                                sx={{ marginRight: "10px" }}
                                key={optionIndex}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      ) : inputField.labelName === "notes" ? (
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
