import { Inputs } from "./Inputs";
import PropTypes from "prop-types";
export const Form = ({ pageName, page }) => {
  return (
    <form>
      <Inputs page={page} />
      <button className="btn btn-primary btn-block mb-5" type="submit">
        {pageName}
      </button>
    </form>
  );
};

Form.propTypes = {
  pageName: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};
