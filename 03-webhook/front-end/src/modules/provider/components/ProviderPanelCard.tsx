import { Card, styled } from "@mui/material";

const ProviderPanelCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.default,
  height: "fit-content",
  padding: theme.spacing(2),
}));

export default ProviderPanelCard;
