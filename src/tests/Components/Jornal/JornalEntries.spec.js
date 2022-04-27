import { Provider } from "react-redux";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { JornalEntries } from "../../../Components/Jornal/JornalEntries";
import { types } from "../../../Types/types";

const initialState = {
  notes: {
    notes: [
      {
        title: "una nota",
        body: "Esta es una nota de prueba",
        id: "123456",
        date: 87926,
      },
      {
        title: "NOTA",
        body: "Otra nota de prueba",
        id: "123",
        date: 65412,
      },
    ],
  },
};
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store = mockStore(initialState);

describe("Test in JornalEntries component", () => {
  const wrapper = mount(
    <Provider store={store}>
      <JornalEntries />
    </Provider>
  );
  it("SnapShot to JornalEntries component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should no exist jornal__entry-picture className", () => {
    const entryPicture = wrapper.find(".jornal__entry-picture").exists();

    expect(entryPicture).toBe(false);
  });

  it("Should execute handleEntryClick", () => {
    wrapper.find(".jornal__entry.pointer").first().prop("onClick")();
    const actions = store.getActions();
    const expectedObject = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
      url: undefined,
    };

    expect(actions[0].type).toEqual(types.notesActive);
    expect(actions[0].payload).toEqual(expectedObject);
  });

  it("Should display the contet of note in component", () => {
    const title = wrapper.find(".jornal__entry-title").first().text();
    const body = wrapper.find(".jornal__entry-content").first().text();
    const date = wrapper.find(".jornal__entry-date-box").first().text();

    expect(title).toEqual(initialState.notes.notes[0].title);
    expect(body).toEqual(initialState.notes.notes[0].body);
    expect(date).toEqual("Wednesday31st");
  });
});
