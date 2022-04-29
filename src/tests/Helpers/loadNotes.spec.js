/**
 * @jest-environment node
 */
import { loadNotes } from "../../Helpers/loadNotes";

describe("test in loadNotes function", () => {
  it("should return and array of notes", async () => {
    const notes = await loadNotes("TESTING");
    expect(notes.length).toBeGreaterThan(0);
  });

  it("should return a empty array", async () => {
    const notes = await loadNotes();

    expect(notes.length).toBe(0);
  });
});
