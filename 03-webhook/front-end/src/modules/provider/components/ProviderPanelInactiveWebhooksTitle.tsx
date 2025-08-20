import { Stack, Typography } from "@mui/material";

interface ProviderPanelInactiveWebhooksTitleProps {
  count: number;
} 

const ProviderPanelInactiveWebhooksTitle: React.FC<
  ProviderPanelInactiveWebhooksTitleProps
> = ({ count }) => (
  <Stack direction="row" alignItems="center" mb={2}>
    <Typography variant="h6" fontWeight={600} mr={1}>
      {count > 0 ? `${count} Inactive Webhooks` : "No Inactive Webhooks"}
    </Typography>
  </Stack>
);

export default ProviderPanelInactiveWebhooksTitle;
