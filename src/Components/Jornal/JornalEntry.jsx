import moment from "moment";
export const JornalEntry = ({ title, body, date, url }) => {
  const noteDate = moment(date);
  return (
    <div className="jornal__entry pointer">
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
