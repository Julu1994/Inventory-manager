
import { Avatar, Button, Divider, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';

import React from "react";
import { config } from "../config";
import { Box } from "@mui/system";
import AdminHeader from "../Components/adminHeader";
import BadgeSharpIcon from '@mui/icons-material/BadgeSharp';

const AdminUser = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };
  const centerPosition = { display: 'flex', justifyContent: "center", alignItems: "center" }
  return (
    <div>
      <Box>
        <AdminHeader />
        <Grid container spacing={2} style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
          columnGap: "6rem"
        }}>
          <Grid item xs={12} sm={12} md={4} justifyContent="center" style={{ paddingLeft: "0" }} >
            <Box sx={{ display: "block", }}>
              <Typography
                sx={centerPosition}
                component="span"
                variant="h6"
                color="text.primary"
              >
                < BadgeSharpIcon sx={{ mr: 1 }} />  Add a new user
              </Typography>
              <Divider sx={{ marginBottom: "2rem" }} />
              <TextField
                sx={{ width: '100%' }}
                id="standard"
                label="Email"
                variant="standard"
              />
            </Box>
            <Box>
              <FormControl sx={{ mt: 1, width: '100%' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl sx={{ mt: 1, width: '100%' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Repeat Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <Button sx={{ width: "100%", marginTop: "2rem" }} variant="contained">  <PersonAddIcon /></Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4} style={{ paddingLeft: "0" }}>
            <Typography
              sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}
              component="span"
              variant="h6"
              color="text.primary"
            >
              <PeopleSharpIcon sx={{ mr: 1 }} /> All users
            </Typography>
            <Divider sx={{ marginBottom: "2rem" }} />
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Oliver Hansen"
                  secondary={
                    <React.Fragment>
                      {" Gorcery Associate"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>

          </Grid>
        </Grid>
      </Box>
    </div>

  );
};

export default AdminUser;
