import { Provider } from "react-redux";
import { AppRouter } from "../src/Routers/AppRouter";
import { store } from "./Store/store";

export const Jornal = () => {
  return (
    <div>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
};
