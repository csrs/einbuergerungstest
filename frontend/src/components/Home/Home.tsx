import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SharedFormPaper } from "../SharedFormPaper/SharedFormPaper";
import { Link } from "@mui/material";
import { sharedAccentLinkSx } from "../../styles/sharedSx";

export const Home = () => {
  return (
    <SharedFormPaper maxWidth={760}>
      <Stack spacing={3}>
        <Box sx={{ textAlign: { xs: "left", sm: "center" } }}>
          <Typography
            variant="overline"
            sx={{ color: "success.dark", fontWeight: 700, letterSpacing: 1.1 }}
          >
            Manage your Anki with ease
          </Typography>
          <Typography
            variant="h3"
            sx={{
              mt: 0.5,
              fontWeight: 700,
              letterSpacing: -0.8,
              fontSize: { xs: "2rem", sm: "2.5rem" },
            }}
          >
            Programatically update your flashcards
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 1.5,
              mx: "auto",
              maxWidth: 620,
              color: "text.secondary",
              lineHeight: 1.7,
            }}
          >
            This project uses AnkiConnect to programatically manage your Anki
            decks and cards.
          </Typography>

          <Link
            href="https://github.com/amikey/anki-connect"
            target="_blank"
            underline="none"
            sx={sharedAccentLinkSx}
          >
            View the API
          </Link>
        </Box>
      </Stack>
    </SharedFormPaper>
  );
};
