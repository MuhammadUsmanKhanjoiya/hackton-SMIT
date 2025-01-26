import React, { useState } from "react"
import { Container, Typography, TextField, Button, Box, Grid, Paper, Alert } from "@mui/material"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const LoanRequestPage = () => {
  const [loanDetails, setLoanDetails] = useState({
    category: "",
    subcategory: "",
    amount: "",
    initialDeposit: "",
    loanPeriod: "",
  })

  const [guarantor1, setGuarantor1] = useState({
    name: "",
    email: "",
    location: "",
    cnic: "",
  })

  const [guarantor2, setGuarantor2] = useState({
    name: "",
    email: "",
    location: "",
    cnic: "",
  })

  const [personalInfo, setPersonalInfo] = useState({
    address: "",
    phoneNumber: "",
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      const response = await axios.post("http://localhost:5000/api/loans/submit", {
        ...loanDetails,
        guarantor1,
        guarantor2,
        ...personalInfo,
        user: user.id,
      })
      setSuccess("Loan request submitted successfully")
      setTimeout(() => navigate("/user-dashboard"), 3000)
    } catch (error) {
      setError("Failed to submit loan request. Please try again.")
    }
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Loan Request Form
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Loan Category"
                value={loanDetails.category}
                onChange={(e) => setLoanDetails({ ...loanDetails, category: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Loan Subcategory"
                value={loanDetails.subcategory}
                onChange={(e) => setLoanDetails({ ...loanDetails, subcategory: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Loan Amount"
                type="number"
                value={loanDetails.amount}
                onChange={(e) => setLoanDetails({ ...loanDetails, amount: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Initial Deposit"
                type="number"
                value={loanDetails.initialDeposit}
                onChange={(e) => setLoanDetails({ ...loanDetails, initialDeposit: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Loan Period (Years)"
                type="number"
                value={loanDetails.loanPeriod}
                onChange={(e) => setLoanDetails({ ...loanDetails, loanPeriod: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Guarantor 1
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                value={guarantor1.name}
                onChange={(e) => setGuarantor1({ ...guarantor1, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={guarantor1.email}
                onChange={(e) => setGuarantor1({ ...guarantor1, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={guarantor1.location}
                onChange={(e) => setGuarantor1({ ...guarantor1, location: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CNIC"
                value={guarantor1.cnic}
                onChange={(e) => setGuarantor1({ ...guarantor1, cnic: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Guarantor 2
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                value={guarantor2.name}
                onChange={(e) => setGuarantor2({ ...guarantor2, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={guarantor2.email}
                onChange={(e) => setGuarantor2({ ...guarantor2, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={guarantor2.location}
                onChange={(e) => setGuarantor2({ ...guarantor2, location: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CNIC"
                value={guarantor2.cnic}
                onChange={(e) => setGuarantor2({ ...guarantor2, cnic: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={personalInfo.address}
                onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                value={personalInfo.phoneNumber}
                onChange={(e) => setPersonalInfo({ ...personalInfo, phoneNumber: e.target.value })}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
            Submit Loan Request
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default LoanRequestPage

