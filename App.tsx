
import React, { useState, useEffect, useCallback } from 'react';
import { Note, Insight } from './types';
import * as noteService from './services/noteService';
import * as geminiService from './services/geminiService';
import AddNoteForm from './components/AddNoteForm';
import NoteList from './components/NoteList';
import InsightModal from './components/InsightModal';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [insights, setInsights] = useState<Insight | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoadingInsights, setIsLoadingInsights] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setNotes(noteService.getNotes());
  }, []);

  const handleAddNote = (content: string) => {
    const newNotes = noteService.addNote(content);
    setNotes(newNotes);
  };

  const handleDeleteNote = (id: string) => {
    const newNotes = noteService.deleteNote(id);
    setNotes(newNotes);
  };

  const handleGetInsights = useCallback(async (note: Note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
    setIsLoadingInsights(true);
    setError(null);
    setInsights(null);

    try {
      const result = await geminiService.getNoteInsights(note.content);
      setInsights(result);
    } catch (err) {
      setError('Failed to get insights. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsLoadingInsights(false);
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
    setInsights(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <div className="container mx-auto max-w-3xl p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            3-Tier Smart Notes
          </h1>
          <p className="text-slate-400 mt-2">
            Presentation (React) &rarr; Application (Gemini) &rarr; Data (LocalStorage)
          </p>
        </header>

        <main>
          <AddNoteForm onAddNote={handleAddNote} />
          <NoteList
            notes={notes}
            onDelete={handleDeleteNote}
            onGetInsights={handleGetInsights}
          />
        </main>

        <InsightModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          insight={insights}
          isLoading={isLoadingInsights}
          error={error}
          noteContent={selectedNote?.content || ''}
        />
      </div>
    </div>
  );
};

export default App;
