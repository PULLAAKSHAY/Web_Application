
import React from 'react';
import { Note } from '../types';
import NoteItem from './NoteItem';

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
  onGetInsights: (note: Note) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onDelete, onGetInsights }) => {
  if (notes.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-slate-800/50 rounded-lg">
        <h2 className="text-xl font-semibold text-slate-300">No notes yet!</h2>
        <p className="text-slate-400 mt-2">Use the form above to add your first note.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onGetInsights={onGetInsights}
        />
      ))}
    </div>
  );
};

export default NoteList;
