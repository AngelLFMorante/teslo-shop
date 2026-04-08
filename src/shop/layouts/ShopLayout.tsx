import { CustomFooter } from "@/shop/components/CustomFooter"
import { CustomHeader } from "@/shop/components/CustomHeader"
import { Outlet } from "react-router"


export const ShopLayout = () => {
    return (
        <div className="min-h-screen bg-background">
            <CustomHeader />
            <Outlet />
            <CustomFooter />
        </div>
    )
}
