import { render, screen } from "@testing-library/react";
import Item from "@/components/connections/item";
import { ConnectionFactory } from "@/lib/factories/connection";
import { QueryClient, QueryClientProvider } from "react-query";

describe("item", () => {
  it("should render connection item", () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const Wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const connection = ConnectionFactory.build();

    render(
      <Wrapper>
        <Item connection={connection} />
      </Wrapper>,
    );

    expect(screen.getByText(connection.name)).toBeInTheDocument();
    expect(screen.getByText(`Type: ${connection.type}`)).toBeInTheDocument();
  });
});
