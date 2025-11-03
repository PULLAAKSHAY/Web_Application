
import React, { useState } from 'react';

interface AddNoteFormProps {
  onAddNote: (content: string) => void;
}

const AddNoteForm: React.FC<AddNoteFormProps> = ({ onAddNote }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onAddNote(content.trim());
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          rows={3}
          className="w-full bg-slate-800 border-2 border-slate-700 rounded-lg p-4 pr-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
        <button
          type="submit"
          disabled={!content.trim()}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
        >
          Add Note
        </button>
      </div>
    </form>
  );
};

export default AddNoteForm;
