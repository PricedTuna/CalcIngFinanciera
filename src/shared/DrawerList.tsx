
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { navButtons } from '../pages/HomePage';

interface Props {
  toggleDrawer: (newOpen: boolean) => void
}

function DrawerList({toggleDrawer}: Props) {
  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
      <List>
        {navButtons.map(({icon, name, path}, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={`/${path}`} >
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
}

export default DrawerList;
