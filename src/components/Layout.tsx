import { Outlet, Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  ThemeProvider,
  createTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import CodeIcon from "@mui/icons-material/Code";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import logo from "../assets/images/logo.svg";
import { TypeAnimation } from "react-type-animation";

const muiTheme = createTheme({
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "홈", icon: <HomeIcon />, path: "/" },
    { text: "일상", icon: <ArticleIcon />, path: "/daily" },
    { text: "개발", icon: <CodeIcon />, path: "/dev" },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={RouterLink}
            to={item.path}
            sx={{
              color: "inherit",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AppBar position="static" sx={{ width: "100%", left: 0, right: 0 }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <img src={logo} alt="logo" width={20} height={20} style={{ marginRight: "10px" }} />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                <TypeAnimation
                  sequence={["WooJoung.DEV", 4000, "개발자 우중입니다.", 1000, "WooJoung.DEV"]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </Typography>
              {isMobile ? (
                <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
                  <MenuIcon />
                </IconButton>
              ) : (
                <Box sx={{ display: "flex", gap: 2 }}>
                  {menuItems.map((item) => (
                    <Button key={item.text} color="inherit" component={RouterLink} to={item.path} startIcon={item.icon}>
                      {item.text}
                    </Button>
                  ))}
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>

        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>

        <Container
          component="main"
          sx={{
            mt: 4,
            mb: 4,
            flex: 1,
            px: { xs: 2, sm: 3 },
          }}
        >
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                px: { xs: 1, sm: 2 },
              }}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <IconButton href="mailto:your.email@example.com" color="primary" aria-label="email" size={isMobile ? "small" : "medium"}>
                  <EmailIcon />
                </IconButton>
                <IconButton
                  href="https://github.com/woojoung1217"
                  target="_blank"
                  color="primary"
                  aria-label="github"
                  size={isMobile ? "small" : "medium"}
                >
                  <GitHubIcon />
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                {"© "}
                {new Date().getFullYear()}
                {" WooJoung.DEV. All rights reserved."}
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
