import { supabase } from "@/lib/supabase";

export const getCommissions = async () => {
  const response = await supabase
    .from("commissions")
    .select("*")
    .order("id", { ascending: false });

  return response.data ? response.data : [];
};

export const getCampaigns = async () => {
  const response = await supabase
    .from("campaigns")
    .select("*")
    .order("id", { ascending: false });

  return response.data ? response.data : [];
};

export const getConnections = async () => {
  const response = await supabase
    .from("connections")
    .select("*")
    .order("id", { ascending: false });

  return response.data ? response.data : [];
};
