import { Box } from "@mui/material"
import ButtonAppBar from "../shared/ButtonAppBar"
import { Outlet } from "react-router-dom"


function MainLayout() {
  return (
    <Box>
      <ButtonAppBar />
      <Outlet />
    </Box>    
  )
}

export default MainLayout
