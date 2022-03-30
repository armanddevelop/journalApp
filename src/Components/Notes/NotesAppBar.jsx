import { useDispatch, useSelector } from "react-redux";
import { startSaveNoteAction } from "../../Actions/notes";

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector(({ notes }) => notes);
  const handleSaveNote = () => {
    dispatch(startSaveNoteAction(note));
  };
  return (
    <div className="notes__appbar">
      <span>19/03/2022</span>
      <div>
        <button className="btn">Picture</button>
        <button className="btn" onClick={handleSaveNote}>
          Save
        </button>
      </div>
    </div>
  );
};
