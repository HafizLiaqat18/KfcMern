import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import OffCanvas from './components/OffCanvas'
import Message from './components/Message'

function App() {
  return (
    <div className='bg-black text-white '>

      <OffCanvas />
      <Header />
      <Message />
      <main>
        <Outlet />
      </main>
      <Footer />


    </div>
  )
}

export default App