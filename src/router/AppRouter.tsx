import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MainLayout from "../layout/MainLayout";
import IsPage from "../pages/CalcPages/IsPage";
import IcPage from "../pages/CalcPages/IcPage";
import PriPage from "../pages/CalcPages/PriPage";
import VpnPage from "../pages/CalcPages/VpnPage";
import TirPage from "../pages/CalcPages/TirPage";
import VaePage from "../pages/CalcPages/VaePage";

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "is",
        element: <IsPage />
      },
      {
        path: "ic",
        element: <IcPage />
      },
      {
        path: "pri",
        element: <PriPage />
      },
      {
        path: "vpn",
        element: <VpnPage />
      },
      {
        path: "tir",
        element: <TirPage />
      },
      {
        path: "vae",
        element: <VaePage />
      }
    ]
  }
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;