import React, { useEffect, useState } from 'react'
import { ethers } from "ethers"
import { contractAddress } from './contracts'
import contractAbi from "./abi/contract.json"
import './App.css'

const provider = new ethers.providers.Web3Provider(window.ethereum)

// get the end user
const signer = provider.getSigner()

// get the smart contract
const contract = new ethers.Contract(contractAddress, contractAbi, signer)

const App = () => {
  const [name, setName] = useState('')
  const [currentAccount, setCurrentAccount] = useState(null)

  const checkWalletConnected = () => {
    const { ethereum } = window
    
    if (!ethereum) {
      console.log("Make sure that you have MetaMask installed")
      return
    } else {
      console.log("Wallet exists! You are ready to go")
    }
  }

  const handleConnect = async () => {
    const { ethereum } = window

    if (!ethereum) {
      alert("Please install metamask")
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      setCurrentAccount(accounts[0])

    } catch (e) {
      console.log("Error: ", e)
    }

  }

  const handleGet = async () => {
    const greet = await contract.greet()
    console.log("Greet:  ", greet)
  }

  const handleSubmit = async () => {
    const res = await contract.setGreeting(name)
    console.log("Res: ", res)
  }

  useEffect(() => {
    checkWalletConnected()
  }, [])

  return (
    <div className="App">
      <button onClick={handleGet}>Get</button>
      <div>
        <input value={name} onChange={e => setName(e.target.value)}></input>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <button onClick={handleConnect}>Connect</button>
    </div>
  );
}

export default App
