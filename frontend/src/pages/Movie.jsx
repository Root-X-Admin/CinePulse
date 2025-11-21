import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Movie(){
  const { id } = useParams()
  const [data, setData] = useState(null)

  useEffect(()=>{
    axios.get(`/api/movies/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
  },[id])

  if(!data) return <div>Loading...</div>

  const { movie, reviews } = data

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <img src={movie.poster} alt="poster" className="w-full rounded shadow-lg" />
      </div>
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold">{movie.title} <span className="text-gray-400">({movie.year})</span></h1>
        <p className="mt-2 text-gray-300">{movie.synopsis}</p>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Trailer</h3>
          <div style={{ position: 'relative', paddingTop: '56.25%' }}>
            <iframe title="trailer" src={movie.trailerUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: 'absolute', top:0, left:0, width:'100%', height:'100%' }}></iframe>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Cast</h3>
          <div className="flex gap-4">
            {movie.cast.map((c,i)=> (
              <div key={i} className="text-sm">
                <div className="font-medium">{c.name}</div>
                <div className="text-gray-400">{c.role}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Reviews</h3>
          {reviews.length === 0 ? <div className="text-gray-400">No reviews yet.</div> : (
            <div className="space-y-4">
              {reviews.map(r => (
                <div key={r._id} className="bg-gray-900 p-4 rounded">
                  <div className="text-sm text-gray-300">{r.author} — <span className="text-yellow-400">{r.rating}/10</span></div>
                  <div className="mt-2">{r.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
