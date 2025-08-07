import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    }}
  >
    <CircularProgress />
  </div>
);

export default Loader;
