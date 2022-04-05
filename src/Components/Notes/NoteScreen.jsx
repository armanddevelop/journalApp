import { useSelector } from "react-redux";
import { Loading } from "../Loading";
import { ModalMsg } from "../ModalMsg";
import { NotesAppBar } from "./NotesAppBar";
import { NotesForm } from "./NotesForm";

export const NoteScreen = () => {
  const { loading } = useSelector((state) => state.ui);
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <ModalMsg />
      {!loading ? <NotesForm /> : <Loading />}
    </div>
  );
};
