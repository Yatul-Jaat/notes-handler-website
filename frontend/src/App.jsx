import React from 'react'
import Hero from './Components/Hero'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Addingnotes from './pages/AddingNotes/Addingnotes'
import Notes from './pages/Notes/Notes'
import PYQPage from './pages/PYQ/Pyq'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Hero/>}>
        <Route index element={<Landing/>} />
        <Route path='pyq' element={<PYQPage/>} />
        <Route path='notes' element={<Notes/>} />
      </Route>
      <Route path="/upload" element={<Addingnotes />} />
    </Routes>
  )
}

export default App