import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";


export const checkAuthAction = async (): Promise<AuthResponse> => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No token found');
        // No hay token, no autenticado
    }

    try {
        const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');
        localStorage.setItem('token', data.token); // Actualiza el token en localStorage
        return data; // Devuelve los datos de autenticación actualizados    

    } catch (error) {
        console.error('Error during auth check:', error);
        localStorage.removeItem('token');
        throw new Error('Invalid or expired token'); // Re-throw the error to be handled by the caller
        // El token es inválido o ha expirado, no autenticado  
    }
}