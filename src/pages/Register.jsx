import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signUpFunc } from "../auth/firebase";
import { useNavigate } from "react-router-dom";

// element olarak form kullanmanin güzelligi:  form a submit özeligi verebiliyoruz. input lari required yapabiliyoruz. burada element olarak form kullanamdik box kullandik ama, box larin component ine form verdik.
// normal button a onClick verdigimizde; required lar calismaz.

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/tariksitki"
        target={"_blank"}
      >
        {" by Tarik Sitki"}
      </Link>
      {` ${new Date().getFullYear()}`}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const [registerData, setRegisterData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [registerError, setRegisterError] = React.useState({
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    passwordError: false,
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    /// Önemli:  mui deki bir form un input larindan veri bu sekilde cekilir.
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });

    /// Önemli: mui deki bir formun inputlarindan cekilen veri state e bu sekilde atilir. paranter icine yazilan email gibi isimler input un name idir.
    setRegisterData({
      ...registerData,
      firstName: data.get("firstname"),
      lastName: data.get("lastname"),
      email : data.get("email"),
      password : data.get("password")
    });
      /// firebase signUp func:
      // islem basarili ise firebase dosyasinda navigate yapariz. 
    signUpFunc(registerData.email, registerData.password, navigate);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            REGISTER
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            // noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="First Name"
              name="firstname"
              autoComplete="firstname"
              autoFocus
              onChange={(e) =>
                setRegisterData({ ...registerData, firstName: e.target.value })
              }
              onBlur={() => {
                return (
                  !registerData.firstName && setRegisterError({ ...registerError, firstNameError: true }) 
                )
              }}
                /// onBlur oldugunda; eger hem error state i varsa hem de firstname state i bos ise hata ver. user bir harf bile girse error kalkar. 
              error={registerError.firstNameError && Boolean(!registerData.firstName) }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Last Name"
              name="lastname"
              autoComplete="lastname"
              onChange={(e) =>
                setRegisterData({ ...registerData, lastName: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              REGISTER
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
