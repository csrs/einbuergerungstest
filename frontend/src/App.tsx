import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./components/Home/Home";
import { AnkiConnect } from "./components/AnkiConnect/AnkiConnect";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "anki-connect", element: <AnkiConnect /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
