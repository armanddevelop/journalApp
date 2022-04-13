import { db } from "../FireBase/fireBaseConfig";

export const loadNotes = async (uid) => {
  try {
    const notesSnap = await db.collection(`${uid}/jornal/notes`).get();
    const notes = [];
    notesSnap.forEach((snapChild) => {
      notes.push({
        id: snapChild.id,
        ...snapChild.data(),
      });
    });
    return notes;
  } catch (error) {
    console.log("shit happends in loadNotes ", error);
  }
};
