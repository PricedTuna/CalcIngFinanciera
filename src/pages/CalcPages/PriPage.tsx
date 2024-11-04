import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface CashFlow {
  period: number;
  amount: number;
}

function PriPage() {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [periods, setPeriods] = useState(1);
  const [cashFlows, setCashFlows] = useState<CashFlow[]>([]);
  const [paybackPeriod, setPaybackPeriod] = useState<number | null>(null);

  const handleInitialInvestmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInitialInvestment(event.target.value);
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

  const handleCalculatePaybackPeriod = (event: React.FormEvent) => {
    event.preventDefault();
    let cumulativeCashFlow = 0;
    const investment = parseFloat(initialInvestment);
    let period = 0;

    for (let i = 0; i < cashFlows.length; i++) {
      cumulativeCashFlow += cashFlows[i].amount;
      period = i + 1;
      if (cumulativeCashFlow >= investment) {
        setPaybackPeriod(period);
        return;
      }
    }

    setPaybackPeriod(null); // No se recupera la inversión en los períodos dados
  };

  return (
    <Box
      component="form"
      onSubmit={handleCalculatePaybackPeriod}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
      }}
    >
      <Typography variant="h5">Calcular Período de Recuperación de la Inversión (PRI)</Typography>
      
      <TextField
        label="Inversión Inicial"
        value={initialInvestment}
        onChange={handleInitialInvestmentChange}
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
        Calcular PRI
      </Button>

      {paybackPeriod !== null ? (
        <Typography variant="h6" sx={{ mt: 2 }}>
          PRI: {paybackPeriod} período(s) para recuperar la inversión.
        </Typography>
      ) : (
        <Typography variant="h6" color="error" sx={{ mt: 2 }}>
          La inversión no se recupera en los períodos especificados.
        </Typography>
      )}
    </Box>
  );
}

export default PriPage
