import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetAccounts = () => {
  console.log("Hono API Hitting Here");
  const query = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      console.log(query,"Hono query API Hitting Here");
      const res = await client.api.accounts.$get();
      if (!res.ok) {
        throw new Error("Failed to fetch accounts");
      }
      const { data } = await res.json();

      console.log(data,"data From Api NextJs");
      return data;
    },
  });
  return query;
};

export default useGetAccounts;
