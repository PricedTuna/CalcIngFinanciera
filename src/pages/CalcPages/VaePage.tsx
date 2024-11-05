import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

function VaePage() {
  const [npv, setNpv] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [lifeSpan, setLifeSpan] = useState("");
  const [aev, setAev] = useState<number | null>(null);

  const handleNpvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNpv(event.target.value);
  };

  const handleDiscountRateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDiscountRate(event.target.value);
  };

  const handleLifeSpanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLifeSpan(event.target.value);
  };

  const calculateAEV = () => {
    const npvValue = parseFloat(npv);
    const rate = parseFloat(discountRate) / 100;
    const years = parseInt(lifeSpan, 10);

    if (rate && years) {
      const aevValue = npvValue * (rate / (1 - Math.pow(1 + rate, -years)));
      setAev(aevValue);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        calculateAEV();
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
      <Typography variant="h5">
        Calcular Valor Anual Equivalente (VAE)
      </Typography>

      <TextField
        label="Valor Presente Neto (VPN)"
        value={npv}
        onChange={handleNpvChange}
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
        label="Vida Útil del Proyecto (años)"
        value={lifeSpan}
        onChange={handleLifeSpanChange}
        type="number"
        fullWidth
        required
      />

      <Button type="submit" variant="contained" color="primary">
        Calcular VAE
      </Button>

      {aev !== null ? (
        <Typography variant="h6" sx={{ mt: 2 }}>
          VAE: ${aev.toFixed(2)} por año
          {aev < 0 && (
            <Typography variant="h6" color="red" sx={{ mt: 2 }}>
              No invertir
            </Typography>
          )}
          {aev > 0 && (
            <Typography variant="h6" color="green" sx={{ mt: 2 }}>
              Invertir
            </Typography>
          )}
          {aev == 0 && (
            <Typography variant="h6" sx={{ mt: 2 }}>
              Recalcular
            </Typography>
          )}
        </Typography>
      ) : (
        <Typography variant="h6" color="error" sx={{ mt: 2 }}>
          No se pudo calcular el VAE.
        </Typography>
      )}
    </Box>
  );
}

export default VaePage;
