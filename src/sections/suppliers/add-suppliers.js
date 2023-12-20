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
import TextField from "@mui/material/TextField"; // Import TextField
import { Box, Card, CardHeader, Container, OutlinedInput, SvgIcon } from "@mui/material";
import axios from "axios"; // Import Axios
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddSupplier() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    full_name: "",
    physical_address: "",
    notes: "",
    company_name: "",
    company_registration_number: "",
    phone_number: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Get the token from local storage
      const storedToken = localStorage.getItem("token").toString();

      // Make a POST request with the form data
      const response = await axios.post(
        "http://159.203.141.75:81/api/v1/school/procurement/new-supplier/",
        formData,
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
        Add Supplier
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
                  subheader="Fill in all the inputs to be able to create a supplier"
                  title="Add a supplier"
                />
                <Divider />
              </Box>
              <Box sx={{ width: "50%", minWidth: "400px" }}>
                {[
                  { label: "Full Name", placeholder: "", field: "full_name" },
                  { label: "Physical Address", placeholder: "", field: "physical_address" },
                  {
                    label: "Notes",
                    placeholder: "",
                    field: "notes",
                    multiline: true,
                    minRows: 4,
                    maxRows: 6,
                  },
                  { label: "Company name", placeholder: "", field: "company_name" },
                  {
                    label: "Company Registration Number",
                    placeholder: "",
                    field: "company_registration_number",
                  },
                  { label: "Phone Number", placeholder: "", field: "phone_number" },
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
                        {inputField.label}
                        <span style={{ color: "red", marginLeft: "5px" }}>* </span>
                      </p>
                      {inputField.multiline ? (
                        <TextField
                          multiline
                          minRows={inputField.minRows}
                          maxRows={inputField.maxRows}
                          variant="outlined"
                          onChange={(e) => handleInputChange(inputField.field, e.target.value)}
                          style={{ width: "100%", marginLeft: "20px" }}
                        />
                      ) : (
                        <OutlinedInput
                          defaultValue=""
                          fullWidth
                          placeholder={inputField.placeholder}
                          onChange={(e) => handleInputChange(inputField.field, e.target.value)}
                          sx={{
                            marginLeft: "20px",
                          }}
                        />
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
