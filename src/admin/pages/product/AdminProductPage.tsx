import { Navigate, useNavigate, useParams } from 'react-router';
import { useProduct } from '@/admin/hooks/useProduct';
import { ProductForm } from './ui/ProductForm';
import type { Product } from '@/interfaces/product.interface';
import { toast } from 'sonner';


export const AdminProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { isLoading, isError, data: product, mutation } = useProduct(id || '');

    const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
    const subtitle =
        id === 'new'
            ? 'Aquí puedes crear un nuevo producto.'
            : 'Aquí puedes editar el producto.';

    const handleSubmit = async (productLike: Partial<Product>) => {
        try {
            await mutation.mutateAsync(productLike, {
                onSuccess: (updatedProduct) => {
                    toast.success(`Producto ${id === 'new' ? 'creado' : 'actualizado'} con éxito!`, {
                        position: 'top-right',
                    });
                    navigate(`/admin/products/${updatedProduct.id}`)
                },
                onError: (error) => {
                    toast.error(`Error al ${id === 'new' ? 'crear' : 'actualizar'} el producto.`, {
                        position: 'top-right',
                    });
                },
            });
        } catch (error) {
            console.error('Error en la mutación:', error);
        }
    }

    if (isError) return <Navigate to='/admin/products' />

    if (isLoading) return <div className="flex items-center justify-center h-screen">
        <span className="text-2xl font-bold">Loading...</span>
    </div>


    if (!product) return <Navigate to='/admin/products' />

    return <ProductForm title={title} subTitle={subtitle} product={product} onSubmit={handleSubmit} isPending={mutation.isPending} />;
};