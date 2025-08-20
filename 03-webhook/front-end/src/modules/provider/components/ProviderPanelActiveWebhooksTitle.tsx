import { Box, Button, Stack, Typography } from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";

interface ProviderPanelActiveWebhooksTitleProps {
  count: number;
}

const ProviderPanelActiveWebhooksTitle: React.FC<
  ProviderPanelActiveWebhooksTitleProps
> = ({ count }) => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    mb={2}
  >
    <Box display="flex" alignItems="center">
      <Typography variant="h6" fontWeight={600} mr={1}>
        {count > 0 ? `${count} Active Webhooks` : "No Active Webhooks"}
      </Typography>
    </Box>
    <Button
      color="info"
      size="small"
      startIcon={<RefreshIcon />}
      variant="outlined"
    >
      Refresh All
    </Button>
  </Stack>
);

export default ProviderPanelActiveWebhooksTitle;
