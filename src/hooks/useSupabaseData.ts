// hooks/useSupabaseData.ts
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useSupabaseData<T>(table: string, selectQuery: string = "*") {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from(table).select(selectQuery);
        if (error) throw error;
        setData(data as T[]);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectQuery, table]);

  return { data, loading, error };
}
