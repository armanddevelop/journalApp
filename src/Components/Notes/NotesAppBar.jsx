import { useDispatch, useSelector } from "react-redux";
import {
  startSaveNoteAction,
  startUploadImageAction,
} from "../../Actions/notes";

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector(({ notes }) => notes);
  const handleSaveNote = () => {
    dispatch(startSaveNoteAction(note));
  };
  const handlePictureClick = () => {
    document.getElementById("fileSelector").click();
  };
  const handleFileChange = ({ target }) => {
    const file = target.files[0];
    if (!file) return;
    dispatch(startUploadImageAction(file));
    document.getElementById("fileSelector").value = "";
  };

  return (
    <div className="notes__appbar">
      <span>19/03/2022</span>
      <input
        type="file"
        id="fileSelector"
        name="picture"
        style={{ display: "none" }}
        onChange={(e) => handleFileChange(e)}
      />
      <div>
        <button className="btn" onClick={handlePictureClick}>
          Picture
        </button>
        <button className="btn" onClick={handleSaveNote}>
          Save
        </button>
      </div>
    </div>
  );
};
