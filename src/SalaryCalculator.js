import React, { useState } from 'react';
import { Button, TextField, Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

function SalaryCalculator() {
  // State for gross salary input
  const [grossSalary, setGrossSalary] = useState(0);
  // State for storing salary details after calculation
  const [salaryDetails, setSalaryDetails] = useState({});

  // Function to calculate after-tax salary
  function calculateAfterTaxSalary() {
    const grossSalaryAnnual = grossSalary;
    const grossSalaryMonthly = grossSalaryAnnual / 12;
    const grossSalaryWeekly = grossSalaryAnnual / 52;
    const grossSalaryHourly = grossSalaryWeekly / 40; // Assuming a 40-hour work week.

    let tax;

    // Tax calculation based on UK tax brackets
    if (grossSalaryAnnual <= 12570) {
      tax = 0;
    } else if (grossSalaryAnnual <= 50270) {
      tax = (grossSalaryAnnual - 12570) * 0.2;
    } else if (grossSalaryAnnual <= 150000) {
      tax = (50270 - 12570) * 0.2 + (grossSalaryAnnual - 50270) * 0.4;
    } else {
      tax = (50270 - 12570) * 0.2 + (150000 - 50270) * 0.4 + (grossSalaryAnnual - 150000) * 0.45;
    }

    // Calculating net salary
    const netSalaryAnnual = grossSalaryAnnual - tax;
    const netSalaryMonthly = netSalaryAnnual / 12;
    const netSalaryWeekly = netSalaryAnnual / 52;
    const netSalaryHourly = netSalaryWeekly / 40;

    // Updating salary details state
    setSalaryDetails({
      annual: { gross: grossSalaryAnnual, net: netSalaryAnnual, deductions: tax },
      monthly: { gross: grossSalaryMonthly, net: netSalaryMonthly, deductions: tax / 12 },
      weekly: { gross: grossSalaryWeekly, net: netSalaryWeekly, deductions: tax / 52 },
      hourly: { gross: grossSalaryHourly, net: netSalaryHourly, deductions: tax / 52 / 40 }
    });
  }  

  // Render component
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Card style={{ width: '50%', padding: '20px' }}>
        <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '20px' }}>UK After-Tax Salary Calculator</Typography>
        <TextField
          id="gross-salary"
          label="Gross Salary in £"
          type="number"
          value={grossSalary}
          onChange={(e) => setGrossSalary(e.target.value)}
          fullWidth
          variant="outlined"
          style={{ marginBottom: '20px' }}
          inputProps={{ 'data-testid': 'gross-salary' }}
        />

        <Button variant="contained" color="primary" onClick={calculateAfterTaxSalary} fullWidth>
          Calculate
        </Button>
        {salaryDetails.annual && (
          <TableContainer component={Card} style={{ width: '100%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontSize: '0.875rem', whiteSpace: 'normal', wordWrap: 'break-word' }}></TableCell>
                <TableCell align="right" style={{ fontSize: '0.875rem', whiteSpace: 'normal', wordWrap: 'break-word' }}>Annual</TableCell>
                <TableCell align="right" style={{ fontSize: '0.875rem', whiteSpace: 'normal', wordWrap: 'break-word' }}>Monthly</TableCell>
                <TableCell align="right" style={{ fontSize: '0.875rem', whiteSpace: 'normal', wordWrap: 'break-word' }}>Weekly</TableCell>
                <TableCell align="right" style={{ fontSize: '0.875rem', whiteSpace: 'normal', wordWrap: 'break-word' }}>Hourly</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">Gross</TableCell>
                  <TableCell align="right">£{salaryDetails.annual.gross}</TableCell>
                  <TableCell align="right">£{salaryDetails.monthly.gross}</TableCell>
                  <TableCell align="right">£{salaryDetails.weekly.gross}</TableCell>
                  <TableCell align="right">£{salaryDetails.hourly.gross}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Net</TableCell>
                  <TableCell align="right">£{salaryDetails.annual.net}</TableCell>
                  <TableCell align="right">£{salaryDetails.monthly.net}</TableCell>
                  <TableCell align="right">£{salaryDetails.weekly.net}</TableCell>
                  <TableCell align="right">£{salaryDetails.hourly.net}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Deductions</TableCell>
                  <TableCell align="right">£{salaryDetails.annual.deductions}</TableCell>
                  <TableCell align="right">£{salaryDetails.monthly.deductions}</TableCell>
                  <TableCell align="right">£{salaryDetails.weekly.deductions}</TableCell>
                  <TableCell align="right">£{salaryDetails.hourly.deductions}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
    </div>
  );
}

export default SalaryCalculator;
