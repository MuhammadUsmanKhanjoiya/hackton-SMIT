import React, { useState } from "react"
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  TextField,
  Slider,
  Paper,
} from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

const loanCategories = [
  {
    name: "Wedding Loans",
    description: "Start your new life together without financial stress",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    maxAmount: 500000,
    maxTenure: 36,
  },
  {
    name: "Home Construction Loans",
    description: "Build the home of your dreams",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    maxAmount: 1000000,
    maxTenure: 60,
  },
  {
    name: "Business Startup Loans",
    description: "Turn your business idea into reality",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    maxAmount: 1000000,
    maxTenure: 60,
  },
  {
    name: "Education Loans",
    description: "Invest in your future through education",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    maxAmount: 500000,
    maxTenure: 48,
  },
]

const LandingPage = () => {
  const [loanAmount, setLoanAmount] = useState(100000)
  const [loanTenure, setLoanTenure] = useState(12)
  const [selectedCategory, setSelectedCategory] = useState(loanCategories[0])

  const calculateEMI = () => {
    const r = 10 / (12 * 100) // Assuming 10% annual interest rate
    const n = loanTenure
    const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    return emi.toFixed(2)
  }

  return (
    <>
      <Box
        sx={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Empower Your Dreams
          </Typography>
          <Typography variant="h5" paragraph>
            Saylani Microfinance offers accessible loans to help you achieve your goals.
          </Typography>
          <Button variant="contained" color="primary" component={RouterLink} to="/register" size="large" sx={{ mt: 2 }}>
            Apply Now
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Loan Calculator
        </Typography>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Loan Details
              </Typography>
              <TextField
                select
                fullWidth
                label="Loan Category"
                value={selectedCategory.name}
                onChange={(e) => setSelectedCategory(loanCategories.find((cat) => cat.name === e.target.value))}
                SelectProps={{
                  native: true,
                }}
                sx={{ mb: 2 }}
              >
                {loanCategories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </TextField>
              <Typography gutterBottom>Loan Amount: Rs. {loanAmount}</Typography>
              <Slider
                value={loanAmount}
                onChange={(_, newValue) => setLoanAmount(newValue)}
                min={10000}
                max={selectedCategory.maxAmount}
                step={10000}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `Rs. ${value}`}
              />
              <Typography gutterBottom sx={{ mt: 2 }}>
                Loan Tenure: {loanTenure} months
              </Typography>
              <Slider
                value={loanTenure}
                onChange={(_, newValue) => setLoanTenure(newValue)}
                min={6}
                max={selectedCategory.maxTenure}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} months`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Loan Summary
              </Typography>
              <Typography variant="body1">Loan Amount: Rs. {loanAmount}</Typography>
              <Typography variant="body1">Loan Tenure: {loanTenure} months</Typography>
              <Typography variant="body1">Interest Rate: 10% per annum</Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Estimated Monthly EMI: Rs. {calculateEMI()}
              </Typography>
              <Button variant="contained" color="primary" component={RouterLink} to="/register" sx={{ mt: 2 }}>
                Apply for This Loan
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Typography variant="h3" align="center" gutterBottom>
          Our Loan Categories
        </Typography>
        <Grid container spacing={4}>
          {loanCategories.map((category) => (
            <Grid item key={category.name} xs={12} sm={6} md={3}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardMedia component="img" height="140" image={category.image} alt={category.name} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default LandingPage

