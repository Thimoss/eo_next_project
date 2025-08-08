import { useState } from "react";
import Api from "../service/Api";
import useSWR from "swr";

export const useDashboard = () => {
  const [sortBy, setSortBy] = useState<string>("recent");

  const fetcher = async (url: string, sortBy: string) => {
    const api = new Api();
    api.url = url;
    api.method = "GET";
    api.body = {
      sortBy,
    };

    const response = await api.call();
    if (!response.statusCode.toString().startsWith("2")) {
      throw new Error(response.meta.message);
    }
    return response.data;
  };

  const { data, error, isLoading, mutate } = useSWR(
    [`category/list`, sortBy],
    ([url, sortBy]) => fetcher(url, sortBy), // The fetcher function
    {
      revalidateOnFocus: false,
      // refreshInterval: 0,
    }
  );
  return {
    data,
    error,
    isLoading,
    mutate,
    setSortBy,
  };
};
