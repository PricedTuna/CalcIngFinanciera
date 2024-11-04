import CalculateIcon from "@mui/icons-material/Calculate";
import { Box, Grid } from "@mui/material";
import { ReactNode } from "react";
import HomeCard from "./components/HomeCard";

export interface NavButton {
  name: string;
  path: string;
  description: string;
  icon: ReactNode;
}

export const navButtons: NavButton[] = [
  {
    name: "Interés simple",
    path: "is",
    icon: <CalculateIcon />,
    description:
      "Calcula el interés simple de una inversión o préstamo, basado en una tasa fija y el tiempo.",
  },
  {
    name: "Interés compuesto",
    path: "ic",
    icon: <CalculateIcon />,
    description:
      "Calcula el interés compuesto, ideal para conocer el valor de una inversión con reinversión de intereses.",
  },
  {
    name: "PRI (Periodo de recuperación de la inversión)",
    path: "pri",
    icon: <CalculateIcon />,
    description:
      "Determina el tiempo necesario para recuperar la inversión inicial en un proyecto o negocio.",
  },
  {
    name: "VPN (Valor presente neto)",
    path: "vpn",
    icon: <CalculateIcon />,
    description:
      "Calcula el valor presente neto, útil para evaluar la rentabilidad de una inversión en el tiempo.",
  },
  {
    name: "VAE (Valor anual equivalente)",
    path: "vae",
    icon: <CalculateIcon />,
    description:
      "Convierte los flujos de efectivo a un valor anual equivalente para comparar proyectos con distinta duración.",
  },
  {
    name: "TIR (Tasa interna de rendimiento)",
    path: "tir",
    icon: <CalculateIcon />,
    description:
      "Calcula la tasa de retorno de una inversión, para decidir sobre su viabilidad y rentabilidad.",
  },
];

function HomePage() {
  return (
    <Box
      display="flex"
      minHeight={`${85}vh`}
      justifyContent="center"
      alignItems="center"
      padding={2}
    >
      <Grid container spacing={3} padding={2}>
        {navButtons.map(({ icon, name, path, description }) => (
          <HomeCard
            icon={icon}
            name={name}
            path={path}
            description={description}
          />
        ))}
      </Grid>
    </Box>
  );
}

export default HomePage;
