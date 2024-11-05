import { Box } from "@mui/material"
import ButtonAppBar from "../shared/ButtonAppBar"
import { Outlet } from "react-router-dom"


function MainLayout() {
  return (
    <Box>
      <ButtonAppBar />
      <Box p={5}>
        <Outlet />
      </Box>
    </Box>    
  )
}

export default MainLayout
