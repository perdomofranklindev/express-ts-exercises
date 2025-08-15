import React from "react";

// MUI Components

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import ButtonGroup from '@mui/material/ButtonGroup';

// MUI Icons

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import RefreshIcon from "@mui/icons-material/Refresh";

// Theme

import { useTheme } from "@mui/material";

// Models

import type { Webhook } from "../../../shared/api/models/webhook.model";

interface WebhookCardProps {
  webhook: Webhook;
  expanded: boolean;
  onToggleExpand: (id: string) => void;
  onEdit: () => void;
  onDelete: () => void;
  onRegenerate: () => void;
  onTrigger: () => void;
  onCopySecret: (secret: string, id: string) => void;
  triggering: boolean;
  copiedSecret: string | null;
  formatDate: (date: Date | null) => string;
}

const WebhookCard: React.FC<WebhookCardProps> = ({
  webhook,
  expanded,
  onToggleExpand,
  onEdit,
  onDelete,
  onRegenerate,
  onTrigger,
  onCopySecret,
  triggering,
  copiedSecret,
  formatDate,
}) => {
  const theme = useTheme();
  const isActive = !!webhook.enabledAt;

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        transition: "all 0.3s ease",
        borderColor: isActive ? "success.light" : "warning.light",
        background: isActive
          ? "linear-gradient(135deg, rgba(16, 185, 129, 0.02) 0%, rgba(16, 185, 129, 0.05) 100%)"
          : "linear-gradient(135deg, rgba(245, 158, 11, 0.02) 0%, rgba(245, 158, 11, 0.05) 100%)",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: theme.shadows[8],
          borderColor: isActive ? "success.main" : "warning.main",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: isActive ? "success.main" : "warning.main",
              width: 40,
              height: 40,
            }}
          >
            {isActive ? <CheckCircleIcon /> : <WarningIcon />}
          </Avatar>
        }
        title={
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {webhook.label || "Unnamed Webhook"}
          </Typography>
        }
        subheader={
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ mt: 0.5 }}
          >
            <Typography variant="body2" color="text.secondary" noWrap>
              {webhook.url}
            </Typography>
            <Chip
              label={webhook.eventType.replace(/_/g, " ")}
              size="small"
              color={isActive ? "success" : "warning"}
              variant="outlined"
            />
          </Stack>
        }
        action={
          <Stack direction="row" spacing={1}>
            {triggering && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LinearProgress sx={{ width: 40, mr: 1 }} />
              </Box>
            )}
            <Tooltip title={expanded ? "Show less" : "Show details"}>
              <IconButton
                onClick={() => onToggleExpand(webhook.id)}
                sx={{
                  bgcolor: "action.hover",
                  "&:hover": { bgcolor: "action.selected" },
                }}
              >
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Tooltip>
          </Stack>
        }
      />

      <Collapse in={expanded} timeout="auto">
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                Status
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: isActive ? "success.main" : "warning.main",
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {isActive ? "Active" : "Inactive"}
                </Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                Created
              </Typography>
              <Typography variant="body2">
                {formatDate(webhook.createdAt)}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Secret Key
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  bgcolor: "grey.50",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "monospace",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "70%",
                  }}
                >
                  {webhook.secretKey}
                </Typography>
                <Tooltip
                  title={
                    copiedSecret === webhook.id ? "Copied!" : "Copy secret"
                  }
                >
                  <IconButton
                    size="small"
                    onClick={() => onCopySecret(webhook.secretKey, webhook.id)}
                    sx={{
                      color:
                        copiedSecret === webhook.id
                          ? "success.main"
                          : "text.secondary",
                    }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
          <ButtonGroup variant="outlined" size="small">
            <Button
              startIcon={<RefreshIcon />}
              onClick={onRegenerate}
              sx={{ borderRadius: "20px 0 0 20px" }}
            >
              Regenerate
            </Button>
            <Button
              startIcon={triggering ? <StopIcon /> : <PlayArrowIcon />}
              onClick={onTrigger}
              disabled={triggering}
              sx={{ borderRadius: "0 20px 20px 0" }}
            >
              {triggering ? "Sending..." : "Test"}
            </Button>
          </ButtonGroup>

          <ButtonGroup size="small">
            <Tooltip title="Edit webhook">
              <IconButton onClick={onEdit} size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete webhook">
              <IconButton onClick={onDelete} size="small" color="error">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </CardActions>
      </Collapse>
    </Card>
  );
};

export default WebhookCard;
