import { Box, CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <Box
      className="loading"
      mt={30}
      sx={{
        height: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
