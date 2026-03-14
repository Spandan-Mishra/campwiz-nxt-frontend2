import { fetchAPIFromBackendSingleWithErrorHandling, fetchFromBackend } from "./index";

type RedirectResponse = {
    redirect: string;
}

const API_PATH = import.meta.env.VITE_BACKEND_API_PATH || '/api/v2';

export const initiateLogin = async (callback: string | null, pathName: string = '/user/login') => {
    const qs = `?next=${callback || '/'}`;
    const res = await fetchAPIFromBackendSingleWithErrorHandling<RedirectResponse>(pathName + qs, {
        cache: 'no-cache',
        credentials: 'include',
        redirect: 'manual',
    });
    if ('detail' in res) {
        throw new Error(res.detail)
    }
    const location = res.data.redirect
    if (!location) {
        throw new Error('Location header missing')
    }
    return window.location.href = location

}
export const handleLoginCallback = async (code: string, state: string, pathName: string = '/user/callback') => {
    const qs = `?code=${code}&state=${state}&next=${pathName}`
    const res = await fetchAPIFromBackendSingleWithErrorHandling<RedirectResponse>(pathName + qs, {
        cache: 'no-cache',
        credentials: 'include',
        redirect: 'manual',
    });
    return res
}
export const logoutUser = async (): Promise<boolean> => {
    try {
        const res = await fetchFromBackend(`${API_PATH}/user/logout`, { method: 'GET' });
        return res.ok;
    } catch (e) {
        console.error("Logout failed", e);
        return false;
    }
};

export default handleLoginCallback;
