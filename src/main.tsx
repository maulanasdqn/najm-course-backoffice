import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router";
import { ReactQueryProvider } from "./libs/react-query/react-query-provider";
import {
  add404PageToRoutesChildren,
  addErrorElementToRoutes,
  convertPagesToRoute,
} from "./libs/react-router/file-based-routing";
import "antd/dist/reset.css";
import { middleware } from "./middleware";

const files = import.meta.glob("./app/**/*(page|layout).tsx");
const errorFiles = import.meta.glob("./app/**/*error.tsx");
const notFoundFiles = import.meta.glob("./app/**/*404.tsx");
const loadingFiles = import.meta.glob("./app/**/*loading.tsx");

const routes = convertPagesToRoute(files, loadingFiles) as RouteObject;
addErrorElementToRoutes(errorFiles, routes);
add404PageToRoutesChildren(notFoundFiles, routes);

const router = createBrowserRouter([
  {
    ...routes,
    loader: middleware,
    shouldRevalidate: () => true,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <RouterProvider router={router} />
    </ReactQueryProvider>
  </StrictMode>,
);
