import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface";



export const getPropductsByIdAction = async (id: string): Promise<Product> => {

    if (!id) throw new Error('Product ID is required');

    if (id === 'new') return {
        id: 'new',
        title: '',
        description: '',
        price: 0,
        slug: '',
        stock: 0,
        sizes: [],
        gender: 'men',
        tags: [],
        images: [],
    } as unknown as Product;

    try {
        const { data } = await tesloApi.get<Product>(`/products/${id}`);
        const images = data.images.map(image => {
            if (image.includes('http')) return image;
            return `${import.meta.env.VITE_TESLO_API_URL}/files/product/${image}`;
        });
        return {
            ...data,
            images
        } as unknown as Product;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}