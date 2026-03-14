import { useCallback, useEffect, useRef, useState } from "react";
import type { PermissionMap, Session } from "../types/session";
import sessionContext from "../contexts/SessionContext";
import { Navigate } from "react-router-dom";
import { fetchAPIFromBackendSingleWithErrorHandling } from "@/api";
import { logoutUser } from "@/api/auth";
const SessionLoading = () => {
    return <div>Loading who are you...</div>;
}
const SessionError = ({ error }: { error: Error }) => {
    return <div>Error loading session: {error.message}</div>;
}
const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [sessionLoading, setSessionLoading] = useState(true);
    const [session, setSession] = useState<Session | null>(null);
    const [sessionError, setSessionError] = useState<Error | null>(null);
    
    const isLoggingOut = useRef(false);

    const handleLogout = useCallback(async () => {
        isLoggingOut.current = true;
        await logoutUser();
        setSession(null);

    }, [])

    const hasPermission = useCallback((permission: string, permissionMap: PermissionMap): boolean => {
        return !!permissionMap && permissionMap[permission as keyof PermissionMap] > 1;
    }, [])

    const fetchSession = useCallback(async (isRefresh = false) => {
        if (isLoggingOut.current) {
            return;
        }

        if (!isRefresh) {
            setSessionLoading(true);
        }

        try {
            const response = await fetchAPIFromBackendSingleWithErrorHandling<Session>('/user/me');
            if ('detail' in response) {
                if (session) setSession(null);
                throw new Error(response.detail);
            }
            const data = response.data;
            const sessionData: Session = {
                ...data,
                logout: handleLogout,
                hasPermission: (permission: string) => hasPermission(permission, data.permissionMap)
            }
            setSession(sessionData);
            setSessionError(null);
        } catch (error) {
            setSession(null);
            console.error("Failed to fetch session:", error);
            setSessionError(error as Error);
        } finally {
            setSessionLoading(false);
        }
    }, [handleLogout, hasPermission, session]);

    useEffect(() => {
        fetchSession();
    }, [fetchSession]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchSession(true);
        }, 5 * 60 * 1000); // Refresh every 5 minutes

        return () => clearInterval(interval);
    }, [session, fetchSession]);

    if (sessionLoading) {
        return <SessionLoading />;
    }
    if (!session) {
        if (window.location.pathname.startsWith('/user/login')) {
            <sessionContext.Provider value={null}>
                {children}
            </sessionContext.Provider>
        }

        const path = encodeURIComponent(window.location.pathname + window.location.search);
        return <Navigate to={`/user/login?next=${path}`} replace />;
    }
    if (sessionError) {
        return <SessionError error={sessionError} />;
    }
    return (
        <sessionContext.Provider value={session}>
            {children}
        </sessionContext.Provider>
    )
}
export default SessionProvider;