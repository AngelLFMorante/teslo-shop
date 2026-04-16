import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { appRouter } from "./app.route"
import { RouterProvider } from "react-router"
import { Toaster } from "sonner"
import type { PropsWithChildren } from "react"
import { useAuthStore } from "./auth/store/auth.store"

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {

    const { checkAuthAction } = useAuthStore();

    const { isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: checkAuthAction,
        retry: false,
        refetchInterval: 1000 * 60 * 1.5, // 1.5 minutes
        refetchOnWindowFocus: true,
    });

    if (isLoading) return <div className="flex items-center justify-center h-screen">
        <span className="text-2xl font-bold">Loading...</span>
    </div>

    return children;
};

export const TesloShopApp = () => {



    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />
            <CheckAuthProvider>
                <RouterProvider router={appRouter} />
            </CheckAuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
