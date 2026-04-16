import type { User } from '@/interfaces/user.interface';
import { create } from 'zustand'
import { loginAction } from '../actions/login.actin';
import { checkAuthAction } from '../actions/check-auth.action';


type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';


type AuthState = {
    //properties
    user: User | null;
    token: string | null;
    authStatus: AuthStatus;

    //methods
    isAdmin: () => boolean;

    //actions
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    checkAuthAction: () => Promise<boolean>;

}

export const useAuthStore = create<AuthState>()((set, get) => ({

    user: null,
    token: null,
    authStatus: 'checking',

    isAdmin: () => {
        const roles = get().user?.roles || [];
        return roles.includes('admin');
    },

    login: async (email: string, password: string) => {
        try {

            const data = await loginAction(email, password);
            localStorage.setItem('token', data.token);

            set({
                user: data.user,
                token: data.token,
                authStatus: 'authenticated'
            });

            return true; // Indica que el login fue exitoso
        } catch (error) {
            console.error('Error during login:', error);
            localStorage.removeItem('token'); // Elimina el token del almacenamiento local en caso de error de login
            set({
                user: null,
                token: null,
                authStatus: 'not-authenticated'
            });
            return false; // Indica que el login falló
        }
    },

    logout: () => {
        localStorage.removeItem('token'); // Elimina el token del almacenamiento local al cerrar sesión
        set({
            user: null,
            token: null,
            authStatus: 'not-authenticated'
        });
    },

    checkAuthAction: async () => {
        try {
            const data = await checkAuthAction();
            set({
                user: data.user,
                token: data.token,
                authStatus: 'authenticated'
            });
            return true; // Indica que la autenticación es válida
        } catch (error) {
            console.error('Error during authentication check:', error);
            localStorage.removeItem('token'); // Elimina el token del almacenamiento local en caso de error de autenticación
            set({
                user: null,
                token: null,
                authStatus: 'not-authenticated'
            });
            return false; // Indica que la autenticación no es válida
        }
    },


}))

