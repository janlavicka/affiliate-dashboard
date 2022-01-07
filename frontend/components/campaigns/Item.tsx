import { Campaign } from "@/types";

type Props = {
  campaign: Campaign;
};

export default function Item({ campaign }: Props) {
  return (
    <li role="listitem">
      <div className="flex items-center gap-4 px-4 py-5">
        <div className="flex-shrink-0 hidden sm:block">
          <img
            src={campaign.logo_url}
            alt={campaign.name}
            className="h-8"
            loading="lazy"
          />
        </div>

        <div className="flex items-center justify-between flex-grow gap-4">
          <div>
            <p className="text-base font-medium text-gray-900">
              {campaign.name}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              URL: {campaign.web_url}
            </p>
          </div>

          <div className="hidden md:block">
            {campaign.maximum_approval_period && (
              <p className="text-base text-gray-700">
                Approval period {campaign.maximum_approval_period} days
              </p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
