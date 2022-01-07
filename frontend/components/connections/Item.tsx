import { Connection } from "@/types";
import axios from "axios";
import { useState } from "react";
import { useQueryClient } from "react-query";

type Props = {
  connection: Connection;
};

export default function Item({ connection }: Props) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async (id: string) => {
    // request import
    setIsLoading(true);
    await axios.post("/api/ehub-cz/import", { id });
    setIsLoading(false);

    // refetch queries to get new data
    queryClient.removeQueries("commissions");
    queryClient.removeQueries("campaigns");
  };

  return (
    <li role="listitem">
      <div className="flex items-center justify-between px-4 py-5">
        <div>
          <p className="text-base font-medium text-gray-900">
            {connection.name}
          </p>
          <p className="mt-2 text-sm text-gray-500">Type: {connection.type}</p>
        </div>

        <div>
          <button
            className="px-4 py-2 font-medium text-gray-900 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => handleImport(connection.id)}
            disabled={isLoading}
          >
            {isLoading ? "Importing..." : "Import"}
          </button>
        </div>
      </div>
    </li>
  );
}
