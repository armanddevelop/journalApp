//import { SelectOption } from "./SelectOption";
import { NoteScreen } from "../Notes/NoteScreen";
import { SideBar } from "./SideBar";
export const JornalScreen = () => {
  return (
    <div className="jornal__main-content">
      <SideBar />
      <main>
        {/* <SelectOption /> */}
        <NoteScreen />
      </main>
    </div>
  );
};
