import { JornalEntries } from "./JornalEntries";

export const SideBar = () => {
  return (
    <aside className="jornal__sidebar">
      <div className="jornal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon"></i>
          <span> Licha</span>
        </h3>
        <button className="btn">LogOut</button>
      </div>
      <div className="jornal__new-entry">
        <i className="far fa-calendar-plus fa-5x jornal__new-entry-icon"></i>
        <p className="mt-5">New Entry</p>
      </div>
      <JornalEntries />
    </aside>
  );
};
