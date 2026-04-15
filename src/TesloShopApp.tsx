import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { appRouter } from "./app.route"
import { RouterProvider } from "react-router"


const queryClient = new QueryClient();

export const TesloShopApp = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={appRouter} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
