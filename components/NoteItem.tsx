
import React from 'react';
import { Note } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import TrashIcon from './icons/TrashIcon';

interface NoteItemProps {
  note: Note;
  onDelete: (id:string) => void;
  onGetInsights: (note: Note) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete, onGetInsights }) => {
  const formattedDate = new Date(note.createdAt).toLocaleString();

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-5 flex flex-col justify-between transition-transform hover:scale-[1.02]">
      <p className="text-slate-300 whitespace-pre-wrap flex-grow mb-4">{note.content}</p>
      <div className="flex justify-between items-center text-sm text-slate-500 border-t border-slate-700 pt-3 mt-3">
        <span>{formattedDate}</span>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onGetInsights(note)}
            className="flex items-center space-x-1.5 text-cyan-400 hover:text-cyan-300 font-semibold p-2 rounded-md hover:bg-slate-700/50 transition-colors"
            title="Get AI Insights"
          >
            <SparklesIcon />
            <span>Insights</span>
          </button>
          <button 
            onClick={() => onDelete(note.id)}
            className="text-red-500 hover:text-red-400 p-2 rounded-md hover:bg-slate-700/50 transition-colors"
            title="Delete Note"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
