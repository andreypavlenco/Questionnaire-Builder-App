import { createBrowserRouter, redirect } from "react-router-dom";
import { Providers } from "./providers";
import App from "./app";
import { ROUTES } from "../shared/model/routes";

    export const router = createBrowserRouter([
       {
        element: (
            <Providers>
             <App />
            </Providers>
        ),
        children: [
             {
                path: ROUTES.QUESTIONNAIRES,
                lazy: () => import("@/features/catalog/catalog.page"),
            },
            {
                path: ROUTES.HOME,
                loader: () => redirect(ROUTES.QUESTIONNAIRES),
            }
        ]
       }
    ]);