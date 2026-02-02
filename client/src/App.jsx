import { useEffect, useState } from 'react'
import './App.css'
import Authentication from './components/Authentication';
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
        <Authentication/>
      </div>
    </>
  )
}

export default App
