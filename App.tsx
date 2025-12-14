import React, { useState, useEffect } from 'react';
import { generateLegalExplanation } from './services/geminiService';
import { BilingualExplanation, LoadingState } from './types';
import { ExplanationCard } from './components/ExplanationCard';
import { InputSection } from './components/InputSection';
import { ContactSection } from './components/ContactSection';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { AlertCircle, Languages } from 'lucide-react';

const DEFAULT_TERM = "Revocable Living Trust";
type ViewMode = 'english' | 'spanish' | 'both';

export default function App() {
  const [term, setTerm] = useState(DEFAULT_TERM);
  const [data, setData] = useState<BilingualExplanation | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('both');

  const fetchExplanation = async (searchTerm: string) => {
    setStatus(LoadingState.LOADING);
    setError(null);
    try {
      const result = await generateLegalExplanation(searchTerm);
      setData(result);
      setStatus(LoadingState.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setStatus(LoadingState.ERROR);
      setError("We couldn't generate an explanation at this moment. Please check your connection or try a different term.");
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchExplanation(DEFAULT_TERM);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (newTerm: string) => {
    setTerm(newTerm);
    fetchExplanation(newTerm);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <DisclaimerBanner />
      
      {/* Header Background */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 opacity-95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center">
            <div className="flex flex-col justify-center">
              <h1 className="text-xl md:text-2xl font-bold font-serif text-slate-900 leading-tight">Pujol Law Office, P.A.</h1>
              <p className="text-xs md:text-sm text-slate-500 font-medium tracking-wide">Bilingual Estate Planning Explained</p>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
            Understanding <span className="text-blue-600">{term}</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We translate complex legal jargon into simple English and Spanish, helping you make informed decisions for your future.
          </p>
        </div>

        <InputSection 
          onSearch={handleSearch} 
          isLoading={status === LoadingState.LOADING} 
          initialTerm={term}
        />

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-200 p-1 rounded-full inline-flex items-center shadow-inner">
            <button 
              onClick={() => setViewMode('english')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${viewMode === 'english' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              English
            </button>
            <div className="w-px h-4 bg-slate-300 mx-1"></div>
            <button 
              onClick={() => setViewMode('both')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${viewMode === 'both' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Languages size={14} />
              <span>Both</span>
            </button>
            <div className="w-px h-4 bg-slate-300 mx-1"></div>
            <button 
              onClick={() => setViewMode('spanish')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${viewMode === 'spanish' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Español
            </button>
          </div>
        </div>

        {status === LoadingState.ERROR && (
          <div className="max-w-md mx-auto p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-700 mb-8">
            <AlertCircle className="flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {status === LoadingState.LOADING && !data && (
          <div className={`grid gap-8 animate-pulse ${viewMode === 'both' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto'}`}>
            {(viewMode === 'both' ? [1, 2] : [1]).map((i) => (
              <div key={i} className="h-96 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
                <div className="h-8 bg-slate-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                </div>
                <div className="h-32 bg-slate-100 rounded-xl mt-6"></div>
              </div>
            ))}
          </div>
        )}

        {data && (
          <div className={`transition-opacity duration-500 ${status === LoadingState.LOADING ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <div className={`grid gap-8 ${viewMode === 'both' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto'}`}>
              {(viewMode === 'english' || viewMode === 'both') && (
                <ExplanationCard content={data.english} language="English" />
              )}
              {(viewMode === 'spanish' || viewMode === 'both') && (
                <ExplanationCard content={data.spanish} language="Spanish" />
              )}
            </div>
          </div>
        )}

        <ContactSection />
      </main>
      
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm space-y-2">
          <p>Educational only. Not legal advice. For your situation, consult an attorney.</p>
          <p>© {new Date().getFullYear()} Pujol Law Office, P.A. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}