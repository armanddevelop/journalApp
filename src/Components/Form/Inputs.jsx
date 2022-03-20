import PropTypes from "prop-types";
export const Inputs = ({ page }) => {
  return (
    <>
      {page === "login" ? (
        <>
          <input
            className="auth__input"
            type="text"
            placeholder="Email"
            name="email"
            autoComplete="off"
          />
          <input
            className="auth__input"
            type="password"
            placeholder="password"
            name="password"
          />
        </>
      ) : (
        <>
          <input
            className="auth__input"
            type="text"
            placeholder="Name"
            name="name"
            autoComplete="off"
          />
          <input
            className="auth__input"
            type="text"
            placeholder="Email"
            name="email"
            autoComplete="off"
          />
          <input
            className="auth__input"
            type="password"
            placeholder="password"
            name="password"
          />
          <input
            className="auth__input"
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
          />
        </>
      )}
    </>
  );
};
Inputs.propTypes = {
  page: PropTypes.string.isRequired,
};
