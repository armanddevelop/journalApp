import { JornalEntry } from "./JornalEntry";

export const JornalEntries = () => {
  const entries = [1, 2, 3, 4, 5];
  return (
    <div className="jornal__entries">
      {entries.map((entry) => (
        <JornalEntry key={entry} />
      ))}
    </div>
  );
};
