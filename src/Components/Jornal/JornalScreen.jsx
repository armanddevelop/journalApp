import { SelectOption } from "./SelectOption";
import { useSelector } from "react-redux";
import { NoteScreen } from "../Notes/NoteScreen";
import { SideBar } from "./SideBar";
export const JornalScreen = () => {
  const { active } = useSelector((state) => state.notes);
  return (
    <div className="jornal__main-content">
      <SideBar />
      <main>{!active ? <SelectOption /> : <NoteScreen />}</main>
    </div>
  );
};
