import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function MovieCard({ movie }){
  return (
    <motion.div whileHover={{ scale: 1.03 }} className="bg-gradient-to-b from-gray-800 to-gray-900 rounded overflow-hidden shadow-lg">
      <Link to={`/movie/${movie._id}`}>
        <img src={movie.poster} alt="poster" className="w-full h-72 object-cover" />
        <div className="p-4">
          <div className="font-semibold text-lg">{movie.title}</div>
          <div className="text-sm text-gray-400">{movie.year} • {movie.genres?.join(', ')}</div>
        </div>
      </Link>
    </motion.div>
  )
}
