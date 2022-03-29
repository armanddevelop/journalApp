import { useSelector } from "react-redux";
import { JornalEntry } from "./JornalEntry";

export const JornalEntries = () => {
  const { notes: entries } = useSelector((state) => state.notes);
  return (
    <div className="jornal__entries">
      {entries.map((entry) => (
        <JornalEntry key={entry.idNote} {...entry} />
      ))}
    </div>
  );
};
