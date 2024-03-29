import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {

  // declaring all the states 
  const [Password, setPassword] = useState("");
  const [Length, setLength] = useState(8);
  const [NumAllow, setNumAllow] = useState(false);
  const [CharAllow, setCharAllow] = useState(false);
  const passref = useRef(null)


  // generator a random password for a given length and optimized it with useCallback() method
  const passwordgenerator = useCallback(() => {
    let pass = ""
    let str = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsamnbvcxz"
    if (NumAllow) str += "1234567890"
    if (CharAllow) str += "@#$%&*-_~{}/"

    for (let i = 1; i < Length; i++) {
      let ch = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(ch)
    }
    setPassword(pass)
  }, [Length, NumAllow, CharAllow])



  //method which make the password copies to your clipboard
  const copypassword = useCallback(() => {
    passref.current?.select();
    window.navigator.clipboard.writeText(Password)
    alert("Password copied")
  }, [Password])

  //re-render the function dependencies part of the virtual dom tree
  useEffect(() => {
    passwordgenerator()
  }, [Length, NumAllow, CharAllow, passwordgenerator])

  return (
    <>


      <div className='bg-gray-700 sm:h-full place-items-center sm:w-1/3 w-screen m- p-4 m-auto sm:m-auto  rounded-lg'>
        <h1 className='text-white text-center text-2xl'>Password Generator</h1>
        <div className='flex justify-center'>

          {/* Password input field */}
          <input type='text'
            value={Password}
            placeholder='password'
            readOnly
            className='rounded-lg'
            ref={passref}
          />

          {/* Copy button */}
          <button className='bg-blue-600 p-2 hover:bg-blue-700 rounded-lg ml-1 border-solid border-2 border-black ' onClick={copypassword}  >Copy</button>
        </div>

        {/* div that containt range-input , number allowed check field, special-character check field */}
        <div className='justify-center sm:flex'>

          {/* range selector */}
          <input type='range'
            min={8}
            max={26}
            value={Length}
            onChange={(e) => { setLength(e.target.value) }}
          />

          {/* label to see how much is the range selected by user */}
          <label className='text-white font-extralight'>Length:{Length}</label>

          {/* Numbers checkbox */}
          <input type='checkbox'
            className='ml-3'
            defaultChecked={NumAllow}
            onChange={() => {
              setNumAllow((prev) => !(prev))
            }} />
          <label className='text-white font-extralight'>Numbers</label>

          {/* special-characters checkbox */}
          <input type='checkbox' className='ml-3'
            defaultChecked={CharAllow}
            onChange={() => {
              setCharAllow((prev) => !(prev))
            }} />
          <label className='text-white font-extralight'>Special-Characters</label>
        </div>
      </div>
    </>
  )
}

export default App
