import React from "react"
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

const Layout = ({ children }) => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            Saylani Microfinance
          </Typography>
          {user.id ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to={user.role === "admin" ? "/admin-dashboard" : "/user-dashboard"}
              >
                Dashboard
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ py: 3, px: 2, mt: "auto", backgroundColor: "primary.main", color: "white" }}>
        <Container maxWidth="sm">
          <Typography variant="body1" align="center">
            © {new Date().getFullYear()} Saylani Microfinance. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout

