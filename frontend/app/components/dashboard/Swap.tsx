import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  TextField,
  Stack,
  FadeProps,
  Container,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import SettingsIcon from "@mui/icons-material/Settings";
import { SUPPORTED_TOKENS } from "@/app/lib/supportedTokens";
import { grey } from "@mui/material/colors";
import Balance from "./Balance";

const TokenSelector = ({
  token,
  balance,
  onTokenSelect,
}: {
  token: string;
  balance: string;
  onTokenSelect: (token: string) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const tokenData = SUPPORTED_TOKENS.find((t) => t.symbol === token);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTokenSelect = (selectedToken: string) => {
    onTokenSelect(selectedToken);
    handleClose();
  };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: "8px 12px",
          bgcolor: grey[100],
          borderRadius: 2,
          cursor: "pointer",
          "&:hover": {
            bgcolor: grey[200],
          },
          minWidth: 120,
        }}
      >
        <Box
          component="img"
          src={tokenData?.image}
          alt={token}
          sx={{
            width: 20,
            height: 20,
            borderRadius: "50%",
          }}
        />
        <Typography sx={{ fontWeight: 500, fontSize: "0.9rem" }}>
          {token}
        </Typography>
        <KeyboardArrowDownIcon
          sx={{ color: "text.secondary", ml: "auto", fontSize: "1.2rem" }}
        />
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1,
            maxHeight: 300,
            width: 200,
          },
        }}
      >
        {SUPPORTED_TOKENS.map((token) => (
          <MenuItem
            key={token.symbol}
            onClick={() => handleTokenSelect(token.symbol)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              py: 1,
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Box
                component="img"
                src={token.image}
                alt={token.symbol}
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={token.symbol}
              secondary={token.name}
              primaryTypographyProps={{
                sx: { fontWeight: 500 },
              }}
              secondaryTypographyProps={{
                sx: { fontSize: "0.75rem" },
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default function Swap({
  isLoading,
  totalUsdBalance,
  snackbarOpen,
  setSnackbarOpen,
}: {
  isLoading: boolean;
  totalUsdBalance: number;
  snackbarOpen: {
    open: boolean;
    Transition: (props: FadeProps) => React.JSX.Element;
    vertical: "top";
    horizontal: "center";
  };
  setSnackbarOpen: (value: {
    open: boolean;
    Transition: (props: FadeProps) => React.JSX.Element;
    vertical: "top";
    horizontal: "center";
  }) => void;
}) {
  const [baseAsset, setBaseAsset] = useState("SOL");
  const [quoteAsset, setQuoteAsset] = useState("USDC");

  return (
    <Container maxWidth="xl" sx={{ pt: 2, pb: 2 }}>
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 2.5,
          border: "1px solid",
          borderColor: grey[200],
          mb: 2,
        }}
      >
        <Balance
          isLoading={isLoading}
          totalUsdBalance={totalUsdBalance}
          snackbarOpen={snackbarOpen}
          setSnackbarOpen={setSnackbarOpen}
        />
      </Paper>
      <Box sx={{ maxWidth: 960, width: "100%", mx: "auto" }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{
              color: "text.secondary",
              textTransform: "none",
              fontWeight: 400,
              p: "4px 8px",
            }}
          >
            Back
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              Powered by
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, color: "#F99D07" }}
            >
              Jupiter
            </Typography>
          </Box>
        </Box>

        {/* Swap Card */}
        <Paper
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: grey[200],
            borderRadius: 2.5,
            p: 2.5,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2.5, fontWeight: 500 }}>
            Swap Tokens
          </Typography>

          {/* You Pay Section */}
          <Box sx={{ mb: 2 }}>
            <Typography
              color="text.secondary"
              sx={{ mb: 1.5, fontWeight: 500, fontSize: "0.9rem" }}
            >
              You Pay:
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 1.5,
                bgcolor: grey[50],
                borderRadius: 2,
                transition: "background-color 0.2s",
                "&:hover": {
                  bgcolor: grey[100],
                },
              }}
            >
              <TokenSelector
                token={baseAsset}
                balance="0.0639"
                onTokenSelect={setBaseAsset}
              />
              <Box sx={{ flexGrow: 1, position: "relative" }}>
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="0"
                  InputProps={{
                    sx: {
                      fontSize: "1.75rem",
                      fontWeight: 500,
                      "&::before": { display: "none" },
                      "&::after": { display: "none" },
                    },
                  }}
                />
                <Button
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "primary.main",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    minWidth: 0,
                    p: "4px 8px",
                    "&:hover": {
                      bgcolor: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Max
                </Button>
              </Box>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.75, ml: 1, fontSize: "0.8rem" }}
            >
              Current Balance: 0 {baseAsset}
            </Typography>
          </Box>

          {/* Swap Direction Button */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              onClick={() => {
                setBaseAsset(quoteAsset);
                setQuoteAsset(baseAsset);
              }}
              sx={{
                bgcolor: grey[100],
                p: 1,
                "&:hover": {
                  bgcolor: grey[200],
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s",
              }}
            >
              <SwapVertIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* You Receive Section */}
          <Box sx={{ mb: 3 }}>
            <Typography
              color="text.secondary"
              sx={{ mb: 1.5, fontWeight: 500, fontSize: "0.9rem" }}
            >
              You Receive:
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 1.5,
                bgcolor: grey[50],
                borderRadius: 2,
              }}
            >
              <TokenSelector
                token={quoteAsset}
                balance="0"
                onTokenSelect={setQuoteAsset}
              />
              <TextField
                fullWidth
                variant="standard"
                placeholder="0"
                disabled
                InputProps={{
                  sx: {
                    fontSize: "1.75rem",
                    fontWeight: 500,
                    "&::before": { display: "none" },
                    "&::after": { display: "none" },
                    color: "text.primary",
                  },
                }}
              />
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.75, ml: 1, fontSize: "0.8rem" }}
            >
              Current Balance: 0 {quoteAsset}
            </Typography>
          </Box>

          {/* Bottom Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2.5,
              color: grey[600],
            }}
          >
            <Button
              sx={{
                color: "inherit",
                textTransform: "none",
                fontSize: "0.85rem",
                p: "4px 8px",
                "&:hover": {
                  bgcolor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              View Swap Details
            </Button>
            <IconButton
              size="small"
              sx={{
                color: "inherit",
                p: 1,
                "&:hover": {
                  bgcolor: grey[100],
                },
              }}
            >
              <SettingsIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Action Buttons */}
          <Stack direction="row" spacing={1.5}>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: 1.5,
                py: 1.25,
                borderColor: grey[300],
                color: "text.primary",
                textTransform: "none",
                fontSize: "0.9rem",
                "&:hover": {
                  borderColor: grey[400],
                  bgcolor: "transparent",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{
                borderRadius: 1.5,
                py: 1.25,
                bgcolor: grey[200],
                color: grey[600],
                textTransform: "none",
                fontSize: "0.9rem",
                "&:hover": {
                  bgcolor: grey[300],
                },
                "&:disabled": {
                  bgcolor: grey[200],
                  color: grey[600],
                },
              }}
              disabled
            >
              Confirm & Swap
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}
