import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { API_URL } from "../config";
import type { RiskLevel } from "../types";
import type { RespToken } from "./tokens";

export interface RespBag {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  riskLevel: RiskLevel;
  tokenAmounts: {
    token: RespToken;
    percentage: number;
  }[];
}

interface CreateBagReqData {
  symbol1: string;
  percentage1: number;
  symbol2: string;
  percentage2: number;
  symbol3: string;
  percentage3: number;
  symbol4: string;
  percentage4: number;
  symbol5: string;
  percentage5: number;
}

export function useBagsQuery() {
  return useQuery({
    queryKey: ["bags"],
    queryFn: async () => {
      const resp = await fetch(`${API_URL}/bags`);
      const respData = (await resp.json()) as { data: RespBag[] };
      return respData;
    },
  });
}

export function useBagQuery(id: string) {
  return useQuery({
    queryKey: ["bags", id],
    queryFn: async () => {
      const resp = await fetch(`${API_URL}/bags/${id}`);
      const respData = (await resp.json()) as { data: RespBag };
      return respData;
    },
  });
}

export function useCreateBagMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, CreateBagReqData>({
    mutationFn: async (data) => {
      await fetch(`${API_URL}/bags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["bags"] });
      toast.success("Bag created");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Bag creation failed");
    },
  });
}
