import { appRouter } from "./app.route"
import { RouterProvider } from "react-router"

export const TesloShopApp = () => {
    return (
        <RouterProvider router={appRouter} />
    )
}
