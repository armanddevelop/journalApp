import PropTypes from "prop-types";
import { Alert } from "@mui/material";

export const AlertUI = ({ msgError }) => {
  return (
    <div className="alerts__container">
      <Alert severity="error">{msgError}</Alert>
    </div>
  );
};
AlertUI.propTypes = {
  msgError: PropTypes.string.isRequired,
};
