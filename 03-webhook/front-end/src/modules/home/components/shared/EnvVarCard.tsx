import { useState } from "react";

// MUI Components

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

// MUI Icons

import EditIcon from "@mui/icons-material/Edit"; 
import DeleteIcon from "@mui/icons-material/Delete"; 
import VpnKeyIcon from "@mui/icons-material/VpnKey"; 
import VisibilityIcon from "@mui/icons-material/Visibility"; 
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"; 
import ContentCopyIcon from "@mui/icons-material/ContentCopy"; 

import type { EnvironmentVariable } from "../../../../shared/api/models/environment-variable.model";
import { formatDate } from "../../../../shared/utils";

// Enhanced Environment Variable Card Component
interface EnvVarCardProps {
  envVar: EnvironmentVariable;
  onEdit: () => void;
  onDelete: () => void;
  onCopySecret: (secret: string, id: string) => void;
  copiedSecret: string | null;
}

const EnvVarCard: React.FC<EnvVarCardProps> = ({
  envVar,
  onEdit,
  onDelete,
  onCopySecret,
  copiedSecret,
}) => {
  const [showSecret, setShowSecret] = useState(false);

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        transition: "all 0.3s ease",
        background:
          "linear-gradient(135deg, rgba(6, 182, 212, 0.02) 0%, rgba(6, 182, 212, 0.05) 100%)",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 4,
          borderColor: "info.main",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "info.main", width: 40, height: 40 }}>
            <VpnKeyIcon />
          </Avatar>
        }
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {envVar.name}
            </Typography>
            {envVar.provider && (
              <Chip
                label={envVar.provider}
                size="small"
                color="info"
                variant="outlined"
              />
            )}
          </Stack>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            Created: {formatDate(envVar.createdAt)}
          </Typography>
        }
        action={
          <ButtonGroup size="small">
            <Tooltip title={showSecret ? "Hide secret" : "Show secret"}>
              <IconButton
                onClick={() => setShowSecret(!showSecret)}
                sx={{
                  bgcolor: "action.hover",
                  "&:hover": { bgcolor: "action.selected" },
                }}
              >
                {showSecret ? (
                  <VisibilityOffIcon fontSize="small" />
                ) : (
                  <VisibilityIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton onClick={onEdit}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={onDelete} color="error">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        }
      />

      <CardContent sx={{ pt: 0 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Secret Value
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
                flexGrow: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {showSecret ? envVar.secretKey : "••••••••••••••••••••••••"}
            </Typography>
            <Tooltip
              title={copiedSecret === envVar.id ? "Copied!" : "Copy secret"}
            >
              <IconButton
                size="small"
                onClick={() => onCopySecret(envVar.secretKey, envVar.id)}
                sx={{
                  color:
                    copiedSecret === envVar.id
                      ? "success.main"
                      : "text.secondary",
                }}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Paper>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EnvVarCard;
