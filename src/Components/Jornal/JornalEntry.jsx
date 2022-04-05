import moment from "moment";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { notesActiveAction } from "../../Actions/notes";

export const JornalEntry = ({ title, body, date, url, id }) => {
  const noteDate = moment(date);
  const dispatch = useDispatch();
  const handleEntryClick = () => {
    const noteObj = { title, body, date, url };
    dispatch(notesActiveAction(id, noteObj));
  };
  return (
    <div className="jornal__entry pointer" onClick={handleEntryClick}>
      {url && (
        <div
          className="jornal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${url})`,
          }}
        ></div>
      )}
      <div className="jornal__entry-body">
        <p className="jornal__entry-title">{title}</p>
        <p className="jornal__entry-content">{body}</p>
      </div>
      <div className="jornal__entry-date-box">
        <span>{noteDate.format("dddd")}</span>
        <h4>{noteDate.format("Do")}</h4>
      </div>
    </div>
  );
};

JornalEntry.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  url: PropTypes.string,
};
