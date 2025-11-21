import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Movie from './pages/Movie'

export default function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white">
        <header className="px-6 py-4 border-b border-gray-700">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link to="/" className="text-2xl font-extrabold tracking-tight">CinePulse</Link>
            <nav className="space-x-4">
              <Link to="/" className="text-sm text-gray-300">Home</Link>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/movie/:id" element={<Movie/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
