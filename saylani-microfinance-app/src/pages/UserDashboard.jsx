import React, { useState, useEffect } from "react"
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
} from "@mui/material"
import axios from "axios"

const loanCategories = ["Wedding Loans", "Home Construction Loans", "Business Startup Loans", "Education Loans"]

const UserDashboard = () => {
  const [loans, setLoans] = useState([])
  const [loanRequest, setLoanRequest] = useState({
    category: "",
    amount: "",
  })

  useEffect(() => {
    fetchLoans()
  }, [])

  const fetchLoans = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      const response = await axios.get(`http://localhost:5000/api/loans/user/${user.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      setLoans(response.data)
    } catch (error) {
      console.error("Error fetching loans:", error)
    }
  }

  const handleLoanRequestChange = (e) => {
    setLoanRequest({ ...loanRequest, [e.target.name]: e.target.value })
  }

  const handleLoanRequestSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      await axios.post(
        "http://localhost:5000/api/loans/submit",
        { ...loanRequest, user: user.id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
      )
      fetchLoans()
      setLoanRequest({ category: "", amount: "" })
    } catch (error) {
      console.error("Error submitting loan request:", error)
    }
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        User Dashboard
      </Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Submit Loan Request
        </Typography>
        <Box component="form" onSubmit={handleLoanRequestSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Loan Category"
                name="category"
                value={loanRequest.category}
                onChange={handleLoanRequestChange}
                required
              >
                {loanCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Loan Amount"
                name="amount"
                type="number"
                value={loanRequest.amount}
                onChange={handleLoanRequestChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit Loan Request
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Typography variant="h6" gutterBottom>
        Your Loan Applications
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan._id}>
                <TableCell>{loan.category}</TableCell>
                <TableCell>{loan.amount}</TableCell>
                <TableCell>{loan.status}</TableCell>
                <TableCell>{new Date(loan.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default UserDashboard

