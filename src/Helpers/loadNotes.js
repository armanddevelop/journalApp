import { db } from "../FireBase/fireBaseConfig";

export const loadNotes = async (uid) => {
  const notesSnap = await db.collection(`${uid}/jornal/notes`).get();
  const notes = [];
  notesSnap.forEach((snapChild) => {
    notes.push({
      idNote: snapChild.id,
      ...snapChild.data(),
    });
  });
  return notes;
};