import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { JornalEntry } from "../../../Components/Jornal/JornalEntry";
import { types } from "../../../Types/types";

const title = "Component";
const body = "This is the body";
const date = 1649197509169;
const id = "123456";
const initState = {
  auth: {},
  ui: {
    errorMsgFb: {
      error: false,
      msgError: "",
    },
  },
  notes: {
    active: {
      id: "safdbdg32435",
    },
    notes: [],
    saveNote: {
      isSave: true,
      message: "All rigth",
      title: "note save",
    },
  },
};
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store = mockStore(initState);
describe("Test in JornalEntry compoent", () => {
  const wrapper = mount(
    <Provider store={store}>
      <JornalEntry title={title} body={body} date={date} id={id} />
    </Provider>
  );
  it("SnapShot to JornalEntry component without url prop", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".jornal__entry-picture").exists()).toEqual(false);
  });

  it("SnapShot to JornalEntry component with url prop", () => {
    const url = "http://www.thisisUrl.com";
    const wrapper = mount(
      <Provider store={store}>
        <JornalEntry title={title} body={body} date={date} id={id} url={url} />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".jornal__entry-picture").exists()).toEqual(true);
  });

  it("Should execute handleEntryClick", () => {
    wrapper.find(".jornal__entry").first().prop("onClick")();
    const actions = store.getActions();
    const objectNote = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
      url: undefined,
    };

    expect(actions[0].type).toEqual(types.notesActive);
    expect(actions[0].payload).toEqual(objectNote);
  });
});
