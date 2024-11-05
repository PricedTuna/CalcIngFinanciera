import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface CashFlow {
  period: number;
  amount: number;
}

function VanPage() {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [periods, setPeriods] = useState(1);
  const [cashFlows, setCashFlows] = useState<CashFlow[]>([]);
  const [npv, setNpv] = useState<number | null>(null);

  const handleInitialInvestmentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInitialInvestment(event.target.value);
  };

  const handleDiscountRateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDiscountRate(event.target.value);
  };

  const handlePeriodsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPeriods = parseInt(event.target.value, 10);
    setPeriods(newPeriods);
    setCashFlows(
      Array.from({ length: newPeriods }, (_, index) => ({
        period: index + 1,
        amount: 0,
      }))
    );
  };

  const handleCashFlowChange = (index: number, value: string) => {
    const updatedCashFlows = [...cashFlows];
    updatedCashFlows[index].amount = parseFloat(value) || 0;
    setCashFlows(updatedCashFlows);
  };

  const calculateNPV = () => {
    const investment = parseFloat(initialInvestment);
    const rate = parseFloat(discountRate) / 100;
    const cashFlowValues = cashFlows.map((cf) => cf.amount);

    const calculatedNPV = cashFlowValues.reduce((acc, cashFlow, i) => {
      return acc + cashFlow / Math.pow(1 + rate, i + 1);
    }, -investment);

    setNpv(calculatedNPV);
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        calculateNPV();
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        mx: "auto",
        mt: 4,
      }}
    >
      <Typography variant="h5">Calcular Valor Presente Neto (VPN)</Typography>

      <TextField
        label="Inversión Inicial"
        value={initialInvestment}
        onChange={handleInitialInvestmentChange}
        type="number"
        fullWidth
        required
      />

      <TextField
        label="Tasa de Descuento (%)"
        value={discountRate}
        onChange={handleDiscountRateChange}
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
        Calcular VPN
      </Button>

      {npv !== null ? (
        <Typography variant="h6" sx={{ mt: 2 }}>
          VPN: ${npv.toFixed(2)}
          {npv < 0 && (
            <Typography variant="h6" color="red" sx={{ mt: 2 }}>
              Rechazo
            </Typography>
          )}
          {npv > 0 && (
            <Typography variant="h6" color="green" sx={{ mt: 2 }}>
              Aceptar
            </Typography>
          )}
          {npv == 0 && (
            <Typography variant="h6" sx={{ mt: 2 }}>
              Replantea
            </Typography>
          )}
        </Typography>
      ) : (
        <Typography variant="h6" color="error" sx={{ mt: 2 }}>
          No se pudo calcular el VPN.
        </Typography>
      )}
    </Box>
  );
}

export default VanPage;
