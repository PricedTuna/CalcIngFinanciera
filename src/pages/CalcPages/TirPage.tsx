import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface CashFlow {
  period: number;
  amount: number;
}

function TirPage() {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [toCompare, setToCompare] = useState('');
  const [periods, setPeriods] = useState(1);
  const [cashFlows, setCashFlows] = useState<CashFlow[]>([]);
  const [irr, setIrr] = useState<number | null>(null);

  const handleInitialInvestmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInitialInvestment(event.target.value);
  };
  
  const handleToCompareChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToCompare(event.target.value);
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

  const calculateIRR = () => {
    const investment = parseFloat(initialInvestment);
    const cashFlowValues = cashFlows.map((cf) => cf.amount);
    
    const guessRate = 0.1; // Valor inicial para la tasa de aproximación
    const tolerance = 0.0001; // Tolerancia para la precisión de la TIR
    let rate = guessRate;
    let iteration = 0;
    let maxIterations = 1000;

    // Función para calcular el VAN en función de una tasa de descuento
    const npv = (rate: number) => 
      -investment + cashFlowValues.reduce((acc, cashFlow, i) => acc + cashFlow / Math.pow(1 + rate, i + 1), 0);

    while (iteration < maxIterations) {
      const currentNPV = npv(rate);
      const nextNPV = npv(rate + tolerance);
      const derivative = (nextNPV - currentNPV) / tolerance;
      const newRate = rate - currentNPV / derivative;

      if (Math.abs(newRate - rate) < tolerance) {
        setIrr(newRate * 100); // Convertir la tasa a porcentaje
        return;
      }

      rate = newRate;
      iteration += 1;
    }

    setIrr(null); // Si no converge, no se encuentra una TIR
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        calculateIRR();
      }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
      }}
    >
      <Typography variant="h5">Calcular Tasa Interna de Retorno (TIR)</Typography>
      
      <TextField
        label="Inversión Inicial"
        value={initialInvestment}
        onChange={handleInitialInvestmentChange}
        type="number"
        fullWidth
        required
      />

      <TextField
        label="Inversión Inicial"
        value={toCompare}
        onChange={handleToCompareChange}
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
        Calcular TIR
      </Button>

      {irr !== null ? (
        <Typography variant="h6" sx={{ mt: 2 }}>
          TIR: {irr.toFixed(2)}%
          {
            irr < +toCompare && (
              <Typography variant="h6" color="red" sx={{ mt: 2 }}>
                No invertir
              </Typography>
            )
          }
          {
            irr == +toCompare && (
              <Typography variant="h6" sx={{ mt: 2 }}>
                replantear
              </Typography>
            )
          }
          {
            irr > +toCompare && (
              <Typography variant="h6" color="green" sx={{ mt: 2 }}>
                Invertir
              </Typography>
            )
          }
        </Typography>
      ) : (
        <Typography variant="h6" color="error" sx={{ mt: 2 }}>
          No se pudo calcular la TIR en los períodos especificados.
        </Typography>
      )}
    </Box>
  );
}

export default TirPage
