import { Outlet, Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container, Box, Button, ThemeProvider, createTheme } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import CodeIcon from "@mui/icons-material/Code";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "'Noto Sans KR', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 700,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    button: {
      fontSize: "1rem",
      fontWeight: 500,
    },
  },
});

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AppBar position="static" sx={{ width: "100%", left: 0, right: 0 }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                WJBLOG
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button color="inherit" component={RouterLink} to="/" startIcon={<HomeIcon />}>
                  홈
                </Button>
                <Button color="inherit" component={RouterLink} to="/daily" startIcon={<ArticleIcon />}>
                  일상
                </Button>
                <Button color="inherit" component={RouterLink} to="/dev" startIcon={<CodeIcon />}>
                  개발
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
          <Outlet />
        </Container>

        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) => theme.palette.grey[200],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body2" color="text.secondary" align="center">
              {"© "}
              {new Date().getFullYear()}
              {" 내 블로그. All rights reserved."}
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
