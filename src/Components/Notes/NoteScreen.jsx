import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notesActiveAction } from "../../Actions/notes";
import { useForm } from "../../Hooks/useForm";
import { ModalMsg } from "../ModalMsg";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector(({ notes }) => notes);
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
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <ModalMsg />
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
        {note.url && (
          <div className="notes__image">
            <img
              src="https://assets.leevalley.com/Size5/10061/49L0795-everyman-s-journal-u-02-r.jpg"
              alt="source"
            />
          </div>
        )}
      </div>
    </div>
  );
};
