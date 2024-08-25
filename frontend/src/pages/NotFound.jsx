import React from 'react'

function NotFound({content}) {
  return (
    <div className='h-screen w-screen bg-black text-3xl flex justify-center items-center text-slate-100'>{
        content
    }</div>
  )
}

export default NotFound