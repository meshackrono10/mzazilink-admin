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
  Card,
  CardHeader,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SvgIcon,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddPayment() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              form
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <Container sx={{ marginTop: "1rem" }}>
            <Card sx={{ p: 2 }}>
              <CardHeader subheader="Manage the notifications" title="Add a customer" />
              <Divider />
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "start",
                }}
              >
                <p>
                  <span style={{ color: "red" }}>* </span>Full Name
                </p>
                <OutlinedInput
                  defaultValue=""
                  fullWidth
                  placeholder=""
                  sx={{
                    maxWidth: 500,
                    marginLeft: "20px",
                  }}
                />
              </ListItem>
              <Divider />
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "start",
                }}
              >
                <p>
                  <span style={{ color: "red" }}>* </span>Physical Address
                </p>
                <OutlinedInput
                  defaultValue=""
                  fullWidth
                  placeholder=""
                  sx={{
                    maxWidth: 500,
                    marginLeft: "20px",
                  }}
                />
              </ListItem>
              <Divider />
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "start",
                }}
              >
                <p>
                  <span style={{ color: "red" }}>* </span>Notes
                </p>
                <OutlinedInput
                  defaultValue=""
                  fullWidth
                  placeholder=""
                  sx={{
                    maxWidth: 500,
                    marginLeft: "20px",
                  }}
                />
              </ListItem>
              <Divider />
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "start",
                }}
              >
                <p>
                  <span style={{ color: "red" }}>* </span>Company name
                </p>
                <OutlinedInput
                  defaultValue=""
                  fullWidth
                  placeholder=""
                  sx={{
                    maxWidth: 500,
                    marginLeft: "20px",
                  }}
                />
              </ListItem>
              <Divider />
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "start",
                }}
              >
                <p>
                  <span style={{ color: "red" }}>* </span>Company Registration Number
                </p>
                <OutlinedInput
                  defaultValue=""
                  fullWidth
                  placeholder=""
                  sx={{
                    maxWidth: 500,
                    marginLeft: "20px",
                  }}
                />
              </ListItem>
              <Divider />
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "start",
                }}
              >
                <p>
                  <span style={{ color: "red" }}>*</span> Date Registered
                </p>
                <OutlinedInput
                  defaultValue=""
                  fullWidth
                  sx={{
                    maxWidth: 500,
                    marginLeft: "20px",
                  }}
                />
              </ListItem>
              <Divider />
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "start",
                }}
              >
                <p>
                  <span style={{ color: "red" }}>* </span>School
                </p>
                <OutlinedInput
                  defaultValue=""
                  fullWidth
                  placeholder=""
                  sx={{
                    maxWidth: 500,
                    marginLeft: "20px",
                  }}
                />
              </ListItem>
              <Divider />
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
                <FormControl sx={{ maxWidth: 500, width: "100%", marginLeft: "20px" }}>
                  <InputLabel id="demo-simple-select-label">Select</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Is Active"
                  >
                    <MenuItem value="true">True</MenuItem>
                    <MenuItem value="false">False</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
              <Divider />
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "start",
                }}
              >
                <p>
                  <span style={{ color: "red" }}>* </span>Are Contacts Valid
                </p>
                <FormControl sx={{ maxWidth: 500, width: "100%", marginLeft: "20px" }}>
                  <InputLabel id="demo-simple-select-label">select</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Are Contacts Valid"
                  >
                    <MenuItem value="true">True</MenuItem>
                    <MenuItem value="false">False</MenuItem>
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
                  sx={{ maxWidth: 510, width: "100%" }}
                  variant="contained"
                  onClick={handleClickOpen}
                >
                  Submit
                </Button>
              </ListItem>
            </Card>
          </Container>
        </List>
      </Dialog>
    </React.Fragment>
  );
}
