import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import PaginatedTable from "./components/PaginatedTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <PaginatedTable />,
      },
    ],
  },
]);

export default router;
