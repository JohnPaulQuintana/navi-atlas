import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export interface AnalyticsStats {
  visitors: number;
  visits: number;
  events: number;
  sessions: number;
  todayVisitors?: number;
  todayVisits?: number;
}

export default function useAnalyticsStats(
  refreshMs = 30000
) {
  const [stats, setStats] = useState<AnalyticsStats | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `${API_URL}/analytics/stats`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }

      const data = await response.json();

      setStats(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    const interval = setInterval(
      fetchStats,
      refreshMs
    );

    return () => clearInterval(interval);
  }, [refreshMs]);

  return {
    stats,
    loading,
    error,
    refresh: fetchStats,
  };
}