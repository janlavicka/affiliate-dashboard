import { render, screen } from "@testing-library/react";
import Item from "@/components/campaigns/item";
import { CampaignFactory } from "@/lib/factories/campaign";

describe("item", () => {
  it("should render campaign item", () => {
    const campaign = CampaignFactory.build();

    render(<Item campaign={campaign} />);

    expect(screen.getByText(campaign.name)).toBeInTheDocument();
    expect(screen.getByText(`URL: ${campaign.web_url}`)).toBeInTheDocument();
    expect(
      screen.getByText(
        `Approval period ${campaign.maximum_approval_period} days`,
      ),
    ).toBeInTheDocument();
  });
});
