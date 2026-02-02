import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data , setData]= useState("connecting....");

  useEffect(()=>{
    fetch('/api/test')
    .then(res=>res.json())
    .then(json=>setData(json.message))
    .catch(err=> console.log(err))
  } , [])

  return (
    <>
      <div>
        <h1>Status :{data} </h1>
      </div>
    </>
  )
}

export default App
