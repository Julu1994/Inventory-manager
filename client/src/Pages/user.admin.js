
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React from "react";
import { config } from "../config";
import { Box } from "@mui/system";
import AdminHeader from "../Components/adminHeader";

const AdminUser = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <Box>
        <AdminHeader />
        <Grid container spacing={2} style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Grid item xs={12} sm={12} md={4}>
            <Box>
              <TextField
                sx={{ width: '100%' }}
                id="outlined-multiline-flexible"
                label="Email"
                multiline
                maxRows={4}
              />
            </Box>
            <Box>
              <FormControl sx={{ width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Box>
            <Box>
              <Button sx={{ width: "100%" }} variant="contained"> Add User</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>

  );
};

export default AdminUser;
