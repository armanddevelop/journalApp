import PropTypes from "prop-types";
export const Inputs = ({ page, values, handleInputChange }) => {
  const { email, password, name, confirmPassword } = values;
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
            value={email}
            onChange={(e) => handleInputChange(e)}
          />
          <input
            className="auth__input"
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
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
            value={name}
            onChange={(e) => handleInputChange(e)}
          />
          <input
            className="auth__input"
            type="text"
            placeholder="Email"
            name="email"
            autoComplete="off"
            value={email}
            onChange={(e) => handleInputChange(e)}
          />
          <input
            className="auth__input"
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
          />
          <input
            className="auth__input"
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e)}
          />
        </>
      )}
    </>
  );
};
Inputs.propTypes = {
  page: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};
