import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";


export const loginAction = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
            email,
            password
        });

        if (!data || !data.token) {
            throw new Error('Login failed');
        }

        return data; // Assuming the response contains user data or a token
    } catch (error) {
        console.error('Error during login:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
};