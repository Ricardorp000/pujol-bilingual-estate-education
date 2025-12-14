import React from 'react';
import { Phone, Mail, Calendar } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 my-12 text-center shadow-xl shadow-slate-200">
      <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">Have specific questions about your estate?</h3>
      <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
        While we simplify the concepts, every situation is unique. Connect with our legal team to secure your legacy.
      </p>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
        <div className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
          <div className="p-2 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-colors">
            <Phone size={20} />
          </div>
          <span className="font-medium">(555) 123-4567</span>
        </div>
        
        <div className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
          <div className="p-2 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-colors">
            <Mail size={20} />
          </div>
          <span className="font-medium">hello@estateeasy.com</span>
        </div>

        <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-900/30 transform hover:-translate-y-0.5 mt-4 md:mt-0">
          <Calendar size={18} />
          <span>Book a Consultation</span>
        </button>
      </div>
    </section>
  );
};