import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface CashFlow {
  period: number;
  amount: number;
}

function IsPage() {
  const [interestRate, setInterestRate] = useState('');
  const [periods, setPeriods] = useState(1);
  const [cashFlows, setCashFlows] = useState<CashFlow[]>([]);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const handleInterestRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInterestRate(event.target.value);
  };

  const handlePeriodsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPeriods = parseInt(event.target.value, 10);
    setPeriods(newPeriods);
    setCashFlows(Array.from({ length: newPeriods }, (_, index) => ({
      period: index + 1,
      amount: 0,
    })));
  };

  const handleCashFlowChange = (index: number, value: string) => {
    const updatedCashFlows = [...cashFlows];
    updatedCashFlows[index].amount = parseFloat(value) || 0;
    setCashFlows(updatedCashFlows);
  };

  const handleCalculateInterest = (event: React.FormEvent) => {
    event.preventDefault();
    const rate = parseFloat(interestRate) / 100;
    const totalPrincipal = cashFlows.reduce((sum, flow) => sum + flow.amount, 0);
    const interest = totalPrincipal * rate * periods;
    setTotalInterest(interest);
  };


return (
    <Box
      component="form"
      onSubmit={handleCalculateInterest}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
      }}
    >
      <Typography variant="h5">Calcular Interés Simple</Typography>
      
      <TextField
        label="Tasa de Interés (%)"
        value={interestRate}
        onChange={handleInterestRateChange}
        type="number"
        fullWidth
        required
      />

      <TextField
        label="Número de Períodos"
        value={periods}
        onChange={handlePeriodsChange}
        type="number"
        fullWidth
        required
      />

      {cashFlows.map((cashFlow, index) => (
        <TextField
          key={cashFlow.period}
          label={`Flujo de Efectivo Período ${cashFlow.period}`}
          value={cashFlow.amount}
          onChange={(e) => handleCashFlowChange(index, e.target.value)}
          type="number"
          fullWidth
          required
        />
      ))}

      <Button type="submit" variant="contained" color="primary">
        Calcular Interés
      </Button>

      {totalInterest !== null && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Interés total final: ${totalInterest.toFixed(2)}
        </Typography>
      )}
    </Box>
  );
}

export default IsPage
