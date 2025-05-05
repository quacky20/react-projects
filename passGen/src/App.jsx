import { useState, useCallback, useEffect, useRef } from "react"

function App() {

  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setChar] = useState(false)
  const [pass, setPass] = useState("")

  const passRef = useRef(null)

  const passGen = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (number) str += "0123456789"
    if (character) str += "!@#$%^&*()-=_+[]{}`~"

    for (let i = 1; i <= length; i++){
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPass(pass)

  }, [length, number, character, setPass])

  useEffect(() => {
    passGen()
  }, [length, number, character, passGen])

  const copyPassToClipboard = useCallback(() => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(pass)
  }, [pass])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-blue-900 bg-cyan-700 py-4">
        <h1 className="text-blue-100 text-center pt-3 text-2xl">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden my-4 bg-white">
          <input type="text"
          value={pass}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passRef}
          />
          <button
          onClick={copyPassToClipboard} 
          className="outline-none bg-blue-950 text-white px-3 py-0.5 shrink-0">Copy</button>
        </div>
        <div className="flex text-sm gap-x-2 text-amber-100">
          <div className="flex items-center gap-x-1">
            <input
            type="range"
            min = {6}
            max = {50}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
            type="checkbox" 
            defaultChecked={number}
            id="numberInput"
            onChange={()=>{
              setNumber((prev) => !prev)
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
            type="checkbox" 
            defaultChecked={character}
            id="charInput"
            onChange={()=>{
              setChar((prev) => !prev)
            }}
            />
            <label htmlFor="charInput">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App