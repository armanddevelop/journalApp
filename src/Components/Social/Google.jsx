import { useDispatch } from "react-redux";
import { getGoogleLogInAction } from "../../Actions/auth";

export const Google = () => {
  const dispatch = useDispatch();
  const handleGoogleSingIn = () => {
    dispatch(getGoogleLogInAction());
  };
  return (
    <div className="auth__social_networks animate__animated animate__fadeIn">
      <p>Login with Social Networks</p>
      <div className="google-btn" onClick={handleGoogleSingIn}>
        <div className="google-icon-wrapper">
          <img
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="google button"
          />
        </div>
        <p className="btn-text">
          <span>Sign in with google</span>
        </p>
      </div>
    </div>
  );
};
