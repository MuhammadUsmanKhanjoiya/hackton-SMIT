import React from "react"
import { Box, Container, Typography, Link } from "@mui/material"

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          Saylani Microfinance
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Empowering communities through accessible financial solutions
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://www.saylaniwelfare.com/">
            Saylani Welfare
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer

