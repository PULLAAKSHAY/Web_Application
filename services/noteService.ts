
import { Note } from '../types';

const NOTES_KEY = 'smart_notes';

export const getNotes = (): Note[] => {
  try {
    const notesJson = localStorage.getItem(NOTES_KEY);
    return notesJson ? JSON.parse(notesJson) : [];
  } catch (error) {
    console.error("Failed to parse notes from localStorage", error);
    return [];
  }
};

export const saveNotes = (notes: Note[]): void => {
  try {
    const sortedNotes = notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    localStorage.setItem(NOTES_KEY, JSON.stringify(sortedNotes));
  } catch (error) {
    console.error("Failed to save notes to localStorage", error);
  }
};

export const addNote = (content: string): Note[] => {
  const notes = getNotes();
  const newNote: Note = {
    id: crypto.randomUUID(),
    content,
    createdAt: new Date().toISOString(),
  };
  const updatedNotes = [newNote, ...notes];
  saveNotes(updatedNotes);
  return updatedNotes;
};

export const deleteNote = (id: string): Note[] => {
  let notes = getNotes();
  const updatedNotes = notes.filter((note) => note.id !== id);
  saveNotes(updatedNotes);
  return updatedNotes;
};
