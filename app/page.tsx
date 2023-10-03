"use client";
import { ClipboardIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { numbers, uppercaseLetters, lowercaseLetters, symbols } from "./character"

export default function Home() {
  const [passwordLength, setPasswordLength] = useState(20); // Password length state
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState(''); // Generated password state

  const handlePasswordGenerate = () => {
    let characterList = '';
    if (includeUppercase) {
      characterList = characterList + uppercaseLetters;
    }
    if (includeLowercase) {
      characterList = characterList + lowercaseLetters;
    }
    if (includeNumbers) {
      characterList = characterList + numbers;
    }
    if (includeSymbols) {
      characterList = characterList + symbols;
    }
     if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
     )
     {
      setGeneratedPassword('Please select at least one password type');
      return;
    }
    if (passwordLength < 10 || passwordLength > 20) {
      setGeneratedPassword('Invalid password length');
      return;
    }
    
    // Generate a random password based on characterList and passwordLength
    let newPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characterList.length);
      newPassword += characterList[randomIndex];
    }

    // Update the generated password state
    setGeneratedPassword(newPassword);


  }
  const copyToClipboard = () => {
    const newTextArea = document.createElement('textArea')
    newTextArea.innerText = generatedPassword
    document.body.appendChild(newTextArea)
    // Use type assertion to specify the element type
    const textAreaElement = newTextArea as HTMLTextAreaElement;

    textAreaElement.select();
    document.execCommand('copy')
    newTextArea.remove()

  }
  //when you click on clipboard it will copied your password 
  const handleCopyPassword = () => {
    copyToClipboard();
    setGeneratedPassword('Text copied'); 

  }
  const handlePasswordClear =()=>{
    setGeneratedPassword('')
  }
  return (
    <div className="container">
      <div className="generator flex justify-center m-auto  bg-[#8a3a3a] w-[30%] pt-10 h-[70%] fixed top-[20%] left-[35%] rounded-md">
        <div className="heading">
          <h1 className='text-[30px] mx-[30px] text-white'>Password Generator</h1>

          <div className="smallhead flex items-center justify-between bg-[#865555] p-1 text-white w-[356px] my-3"  >
            <h2>{generatedPassword}</h2>
            <button onClick={handleCopyPassword}><ClipboardIcon className='w-6 text ml-2' /></button>
          </div>
          <div className="strenght flex items-center justify-between  text-white w-[350px]">
            <label htmlFor="password-strength">Password length</label>
            <input

              type="number"
              id='password-strength'
              name='password-strength'
              max="20"
              min="10"
              className='w-12 text-black outline-none border-2'
              value={passwordLength} // Bind the input value to passwordLength state
              onChange={(e) => setPasswordLength(Number(e.target.value))} // Update passwordLength on change
            />
          </div>
          <div className="uppercase flex items-center justify-between  text-white w-[350px] my-3">
            <label htmlFor="uppercase-letters">Include uppercase</label>
            <input
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              type="checkbox"
              id='uppercase-letters'
              name='uppercase-letters' />
          </div>
          <div className="lowercase flex items-center justify-between  text-white w-[350px] my-3">
            <label htmlFor="lowercase-letters">Include lowercase letters</label>
            <input
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              type="checkbox"
              id='lowercase-letters'
              name='lowercase-letters' />
          </div>
          <div className="flex items-center justify-between  text-white w-[350px] my-3">
            <label htmlFor="include-numbers">Include numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type="checkbox"
              id='include-numbers'
              name='include-numbers' />
          </div>
          <div className="include-symbols flex items-center justify-between  text-white w-[350px] my-3">
            <label htmlFor="include-symbols">Include symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}

              type="checkbox"
              id='include-symbols'
              name='include-symbols'
              className='px-20' />
          </div>
          <div className="buttons flex ">
          <button className='border-2 p-1 flex mx-auto border-[#a15252] text-white my-3 rounded-md' onClick={handlePasswordGenerate}>Generate Now</button>
          <button className='border-2 p-1 flex mx-auto border-[#a15252] text-white my-3 rounded-md' onClick={handlePasswordClear}>Clear Now</button>
          </div>

        </div>
      </div>
    </div>
  )
}
