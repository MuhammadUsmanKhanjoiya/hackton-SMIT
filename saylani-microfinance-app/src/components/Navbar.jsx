import React, { useState } from "react"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  const navItems = user.id
    ? [
        { text: "Dashboard", link: user.role === "admin" ? "/admin-dashboard" : "/user-dashboard" },
        { text: "Logout", onClick: handleLogout },
      ]
    : [
        { text: "Login", link: "/login" },
        { text: "Register", link: "/register" },
      ]

  const renderNavItems = () =>
    navItems.map((item) => (
      <Button
        key={item.text}
        color="inherit"
        component={item.link ? RouterLink : "button"}
        to={item.link}
        onClick={item.onClick}
        sx={{ mx: 1 }}
      >
        {item.text}
      </Button>
    ))

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#2E7D32" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}
          >
            <Box
              component="img"
              src="https://www.saylaniwelfare.com/public/images/saylani/Saylani-logo.png"
              alt="Saylani Logo"
              sx={{ height: 40, mr: 1 }}
            />
            Saylani Microfinance
          </Typography>
          {isMobile ? (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          ) : (
            renderNavItems()
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={item.link ? RouterLink : "button"}
              to={item.link}
              onClick={() => {
                setDrawerOpen(false)
                if (item.onClick) item.onClick()
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}

export default Navbar

