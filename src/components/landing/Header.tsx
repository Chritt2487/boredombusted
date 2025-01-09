import React from 'react';

export default function Header() {
  return (
    <div className="text-center space-y-4 mb-8 animate-fade-in">
      <h1 className="text-5xl font-bold" style={{ 
        color: '#c3502d',
        WebkitTextStroke: '1px black'
      }}>
        Bust Your Boredom!
      </h1>
      <p className="text-gray-600 text-xl">Find exciting activities and hobbies that match your vibe.</p>
    </div>
  );
}