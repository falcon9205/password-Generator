import React, { useCallback, useEffect, useState } from 'react'

const App = () => {
  const [Password,setPassword] = useState("");
  const [Length,setLength] = useState(8);
  const [NumAllow,setNumAllow] = useState(false);
  const [CharAllow,setCharAllow] = useState(false);

  const passwordgenerator = useCallback(()=>{
    let pass = ""
    let str = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsamnbvcxz"
    if(NumAllow) str+="1234567890"
    if(CharAllow) str+="@#$%&*-_~{}/"

    for(let i=1;i<Length;i++)
    {
       let ch = Math.floor(Math.random()*str.length+1)
       pass += str.charAt(ch)
    }
    setPassword(pass)
  },[Length,NumAllow,CharAllow])

  useEffect(()=>{
    passwordgenerator()
  },[Length,NumAllow,CharAllow,passwordgenerator])

  return (
    <>
      <div className='bg-gray-700 sm:h-full place-items-center sm:w-1/3 w-screen  p-5 sm:m-auto mt-10 rounded-lg'>
        <h1 className='text-white text-center text-2xl'>Password Generator</h1>
        <div className='flex justify-center'>
        <input type='text' 
        value={Password}
        placeholder='password'
        readOnly
        />
        <button className='bg-blue-600 p-2'>Copy</button>
        </div>
        <div className='justify-center sm:flex'>
          <input type='range'
          min={8}
          max={26}
          value={Length} 
          onChange={(e)=>{setLength(e.target.value)}}        
          />
          <label className='text-white'>Length:{Length}</label>
          <input type='checkbox' 
          className='ml-3' 
          defaultChecked={NumAllow} 
          onChange={()=>{
            setNumAllow((prev)=>!(prev))
          }} />
          <label className='text-white'>Numbers</label>
          <input type='checkbox' className='ml-3' 
          defaultChecked={CharAllow} 
          onChange={()=>{
            setCharAllow((prev)=>!(prev))
          }}/>
          <label className='text-white'>Special-Characters</label>
                  </div>

       
        </div>
    </>
  )
}

export default App
