import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

function IcPage() {

  const [interestRate, setInterestRate] = useState('');
  const [periods, setPeriods] = useState('');
  const [initialAmount, setInitialAmount] = useState('');
  const [finalAmount, setFinalAmount] = useState<number | null>(null);

  const handleInterestRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInterestRate(event.target.value);
  };

  const handlePeriodsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeriods(event.target.value);
  };

  const handleInitialAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInitialAmount(event.target.value);
  };

  const handleCalculateCompoundInterest = (event: React.FormEvent) => {
    event.preventDefault();
    const rate = parseFloat(interestRate) / 100;
    const n = parseInt(periods, 10);
    const principal = parseFloat(initialAmount);
    const compoundAmount = principal * Math.pow(1 + rate, n);
    setFinalAmount(compoundAmount);
  };

  return (
<Box
      component="form"
      onSubmit={handleCalculateCompoundInterest}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
      }}
    >
      <Typography variant="h5">Calcular Interés Compuesto</Typography>

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

      <TextField
        label="Monto Inicial"
        value={initialAmount}
        onChange={handleInitialAmountChange}
        type="number"
        fullWidth
        required
      />

      <Button type="submit" variant="contained" color="primary">
        Calcular Monto Final
      </Button>

      {finalAmount !== null && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Monto Final (Interés Compuesto): ${finalAmount.toFixed(2)}
        </Typography>
      )}
    </Box>
  )
}

export default IcPage
