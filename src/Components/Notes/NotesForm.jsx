import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { notesActiveAction, startDeleteNoteAction } from "../../Actions/notes";
import { useForm } from "../../Hooks/useForm";

export const NotesForm = () => {
  const { active: note } = useSelector(({ notes }) => notes);
  const dispatch = useDispatch();
  const { values, handleInputChange, reset } = useForm(note);
  const { title, body } = values;
  const idActive = useRef(note.id);

  useEffect(() => {
    if (idActive.current !== note.id) {
      reset(note);
      idActive.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    const { id, date, title, body, url } = values;
    const noteObj = {
      date,
      title,
      body,
      url,
    };
    dispatch(notesActiveAction(id, noteObj));
  }, [values, dispatch]);

  const handleDelete = () => {
    dispatch(startDeleteNoteAction(idActive.current));
  };

  return (
    <div className="notes__content">
      <input
        type="text"
        placeholder="Some awsome title"
        className="notes__title-input"
        autoComplete="off"
        autoFocus={true}
        name="title"
        value={title}
        onChange={(e) => handleInputChange(e)}
      />
      <textarea
        placeholder="What are you doing today"
        className="notes__textarea"
        name="body"
        value={body}
        onChange={(e) => handleInputChange(e)}
      ></textarea>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete note
      </button>
      {note.url && (
        <div className="notes__image">
          <img src={note.url} alt="source" />
        </div>
      )}
    </div>
  );
};
