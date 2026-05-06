import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface";
import { sleep } from "@/lib/sleep";



export const createUpdateProductAction = async (
    productLike: Partial<Product> & { files?: File[] }
): Promise<Product> => {

    await sleep(1500); // Simulamos un retraso de 1.5 segundos para mostrar el loading

    const { id, user, images = [], files = [], ...rest } = productLike;

    const isCreating = id == 'new';

    rest.stock = Number(rest.stock || 0);
    rest.price = Number(rest.price || 0);

    // preparar las imagenes para subirlas, si son nuevas (File) las subimos y obtenemos su URL, si ya son URLs las dejamos tal cual
    if (files && files.length > 0) {
        const newImageNames = await uploadFiles(files);
        images.push(...newImageNames);
    }

    const imagesToSave = images.map(image => {
        if (image.includes('http')) return image.split('/').pop() || ''; // si ya es una URL, obtenemos el nombre del archivo de la URL
        return image; // obtenemos el nombre del archivo de la URL
    });

    const { data } = await tesloApi<Product>({
        url: isCreating ? '/products' : `/products/${id}`,
        method: isCreating ? 'POST' : 'PATCH',
        data: {
            ...rest,
            images: imagesToSave,
        }
    })

    return {
        ...data,
        images: data.images.map(image => {
            if (image.includes('http')) return image;
            return `${import.meta.env.VITE_API_URL}/files/products/${image}`;
        }),
    }
}

export interface FileUploadResponse {
    secureUrl: string;
    fileName: string;
}

const uploadFiles = async (files: File[]) => {

    const uploadPromises = files.map(async file => {
        const formData = new FormData();
        formData.append('file', file);

        const { data } = await tesloApi.post<FileUploadResponse>('/files/product', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return data.fileName;
    });

    const uploadedFileNames = await Promise.all(uploadPromises);

    return uploadedFileNames;
}   