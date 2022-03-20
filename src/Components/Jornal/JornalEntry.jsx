export const JornalEntry = () => {
  return (
    <div className="jornal__entry pointer">
      <div
        className="jornal__entry-picture"
        style={{
          backgroundSize: "cover",
          backgroundImage:
            "url(https://assets.leevalley.com/Size5/10061/49L0795-everyman-s-journal-u-02-r.jpg)",
        }}
      ></div>
      <div className="jornal__entry-body">
        <p className="jornal__entry-title">
          La licha se fue a buscar vestido para la fiesta de Erick
        </p>
        <p className="jornal__entry-content">
          Consequat nostrud nisi sit deserunt amet.
        </p>
      </div>
      <div className="jornal__entry-date-box">
        <span>Monday</span>
        <h4>19</h4>
      </div>
    </div>
  );
};
