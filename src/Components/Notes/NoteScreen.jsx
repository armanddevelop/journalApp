import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awsome title"
          className="notes__title-input"
          autoComplete="off"
        />
        <textarea
          placeholder="What are you doing today"
          className="notes__textarea"
        ></textarea>
        <div className="notes__image">
          <img
            src="https://assets.leevalley.com/Size5/10061/49L0795-everyman-s-journal-u-02-r.jpg"
            alt="source"
          />
        </div>
      </div>
    </div>
  );
};
