import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getPropductsByIdAction } from "../actions/get-products-by-id.action"
import { createUpdateProductAction } from "../actions/create-update-product.action";
import type { Product } from "@/interfaces/product.interface";



export const useProduct = (id: string) => {

    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['product', id],
        queryFn: () => getPropductsByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5,
        enabled: !!id // 5 minutes    
    });


    const mutation = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: (product: Product) => {
            queryClient.setQueryData(['products', { id: product.id }], product);
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['product', { id: product.id }] });

        }
    });


    return {
        ...query,
        mutation
    }
}
