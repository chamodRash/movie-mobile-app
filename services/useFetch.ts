import { useCallback, useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(autoFetch);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unexpected error occurred")
      );
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return { data, error, loading, refetch: fetchData, reset };
};

export default useFetch;
