import type { ResponseError, ResponseSingle } from "@/types/response";
import { useCallback, useState } from "react";

export function useAPI<T>() {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const request = useCallback(async (
        func: () => Promise<ResponseSingle<T> | ResponseError>
    ): Promise<T | null> => {
        setLoading(true);
        setError(null);

        try {
            const res = await func();

            if('detail' in res) {
                setError(res.detail);
                setData(null);
                return null;
            } else {
                setData(res.data);
                return res.data;
            }
        } catch (err) {
            setError((err as Error).message);
            return null;
        } finally {
            setLoading(false);
        }
    }, [])

    return { data, error, loading, request };
}