import { useState, useEffect, useRef, useCallback } from "react";

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseFetchOptions {
  immediate?: boolean;
}

interface UseFetchReturn<T> extends UseFetchState<T> {
  fetchData: () => Promise<void>;
}

function useFetch<T>(
  fetchFn: () => Promise<T>,
  options: UseFetchOptions = {}
): UseFetchReturn<T> {
  const { immediate = true } = options;

  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const result = await fetchFn();

      setState({
        data: result,
        loading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });
    }
  }, [fetchFn]);

  // Effect for initial fetch
  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [immediate, fetchData]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    ...state,
    fetchData,
  };
}

export default useFetch;
