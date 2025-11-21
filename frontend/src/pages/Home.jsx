import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MovieCard from '../components/MovieCard'
import { motion } from 'framer-motion'

export default function Home(){
  const [movies, setMovies] = useState([])
  const [q, setQ] = useState('')

  useEffect(()=>{
    const params = q ? `?q=${encodeURIComponent(q)}` : ''
    axios.get(`/api/movies${params}`)
      .then(res => setMovies(res.data))
      .catch(err => console.error(err))
  },[])

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl font-bold mb-6">Featured</h1>
        <div className="mb-6 flex gap-3">
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search movies..." className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 w-full" />
          <button onClick={() => {
            const params = q ? `?q=${encodeURIComponent(q)}` : ''
            axios.get(`/api/movies${params}`).then(res => setMovies(res.data))
          }} className="px-4 py-2 bg-red-500 rounded text-white">Search</button>
        </div>
      </motion.div>
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies.map(m => (
          <MovieCard key={m._id} movie={m} />
        ))}
      </motion.div>
    </div>
  )
}
