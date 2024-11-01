import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MainLayout from "../layout/MainLayout";
import IsPage from "../pages/CalcPages/IsPage";
import IcPage from "../pages/CalcPages/IcPage";
import PriPage from "../pages/CalcPages/PriPage";
import VanPage from "../pages/CalcPages/VanPage";
import TirPage from "../pages/CalcPages/TirPage";

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
        path: "van",
        element: <VanPage />
      },
      {
        path: "tir",
        element: <TirPage />
      },
    ]
  }
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;