import { useEffect, useState } from "react";
import { loadNotes, saveNotes } from "../utils/storage";

export default function useNotes() {
  const [notes, setNotes] = useState(loadNotes);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  function addNote(note) {
    const now = new Date().toISOString();
    setNotes((current) => [
      {
        ...note,
        id: crypto.randomUUID(),
        isFavorite: false,
        isDeleted: false,
        createdAt: now,
        updatedAt: now,
      },
      ...current,
    ]);
  }

  function updateNote(id, updates) {
    setNotes((current) =>
      current.map((note) =>
        note.id === id
          ? { ...note, ...updates, updatedAt: new Date().toISOString() }
          : note,
      ),
    );
  }

  function toggleFavorite(id) {
    setNotes((current) =>
      current.map((note) =>
        note.id === id ? { ...note, isFavorite: !note.isFavorite } : note,
      ),
    );
  }

  function moveToTrash(id) {
    updateNote(id, { isDeleted: true });
  }

  function restoreNote(id) {
    updateNote(id, { isDeleted: false });
  }

  function deleteForever(id) {
    setNotes((current) => current.filter((note) => note.id !== id));
  }

  function emptyTrash() {
    setNotes((current) => current.filter((note) => !note.isDeleted));
  }

  return {
    notes,
    addNote,
    updateNote,
    toggleFavorite,
    moveToTrash,
    restoreNote,
    deleteForever,
    emptyTrash,
  };
}
