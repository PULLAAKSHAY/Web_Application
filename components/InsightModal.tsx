
import React from 'react';
import { Insight } from '../types';
import LoaderIcon from './icons/LoaderIcon';

interface InsightModalProps {
  isOpen: boolean;
  onClose: () => void;
  insight: Insight | null;
  isLoading: boolean;
  error: string | null;
  noteContent: string;
}

const InsightModal: React.FC<InsightModalProps> = ({ isOpen, onClose, insight, isLoading, error, noteContent }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg relative border border-slate-700 transform transition-transform animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start mb-4">
             <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Note Insights
             </h2>
             <button onClick={onClose} className="text-slate-500 hover:text-slate-300">&times;</button>
          </div>

          <div className="max-h-32 overflow-y-auto p-3 mb-6 bg-slate-900/50 rounded-md border border-slate-700">
            <p className="text-slate-400 italic whitespace-pre-wrap">"{noteContent}"</p>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center justify-center h-48">
              <LoaderIcon />
              <p className="mt-4 text-slate-400">Generating insights...</p>
            </div>
          )}

          {error && (
            <div className="text-center p-4 bg-red-900/50 border border-red-700 rounded-lg">
                <p className="text-red-400 font-semibold">An Error Occurred</p>
                <p className="text-red-400/80 text-sm mt-1">{error}</p>
            </div>
          )}

          {insight && !isLoading && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-slate-300">Summary</h3>
                <p className="text-slate-400 mt-1">{insight.summary}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-300">Key Topics</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {insight.topics.map((topic, index) => (
                    <span key={index} className="bg-cyan-900/70 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-300">Category</h3>
                <p className="bg-indigo-900/70 text-indigo-300 text-sm font-medium px-3 py-1 rounded-full inline-block mt-2">
                    {insight.category}
                </p>
              </div>
            </div>
          )}
        </div>
         <button 
            onClick={onClose} 
            className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold py-3 rounded-b-xl transition-colors mt-4">
              Close
          </button>
      </div>
    </div>
  );
};

export default InsightModal;
