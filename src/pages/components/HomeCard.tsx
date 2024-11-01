import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavButton } from "../HomePage";

interface Props extends NavButton {}

function HomeCard({ name, path, icon, description }: Props) {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(`/${path}`);
  };

  return (
    <Grid item xs={12} sm={6} md={4} key={path}>
      <Card
        onClick={() => handleNavigate(path)}
        sx={{ cursor: "pointer", "&:hover": { boxShadow: 6 } }}
      >
        <CardContent>
          <Typography variant="h6" component="div" mb={1}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {description}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.stopPropagation(); // Para evitar que el card redirija si se usa el botón
              handleNavigate(path);
            }}
            sx={{ mt: 2 }}
            startIcon={icon}
          >
            Ir a Calculadora
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default HomeCard;
