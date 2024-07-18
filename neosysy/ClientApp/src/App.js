import { RouterProvider } from "react-router-dom";
import router from "./AppRoutes";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
