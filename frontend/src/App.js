import React,{useEffect, useState} from 'react'
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3'
import HeaderPage from './components/headerpage'
import Admin from './components/admin'
import Voter from './components/voter'
import Voting from './contracts/Voting.json'
import Home from './components/home'

import {
  BrowserRouter as Router,
  Routes,
  Route
  } from "react-router-dom";

  
function App() {
  const [web3Api, setWeb3Api] = useState({
    web3:null,
    contract:null,
    owner:null
  });

  const [account, setAccount] = useState(null); 
  
  useEffect(() => {
    const letProvider = async()=>{
    const provider = await detectEthereumProvider();
    if(provider){
      console.log('Ethereum successfully detected!');
    }
    else{
      console.log('Please install MetaMask!');
    }
    const web3 = new Web3(provider);
    const networksID = await web3.eth.net.getId();
    const contract = new web3.eth.Contract(Voting.abi, Voting.networks[networksID].address);
    const owner=await contract.methods.owner().call();
    setWeb3Api({
      web3,
      contract,
      owner
    });}
    letProvider();
  }, [account])
  
  return (
    <>
    <Router>
      <HeaderPage account1={account} setAccount1={setAccount} owner={web3Api.owner}/>
      <Routes>
        <Route exact path="/" element={<Home account1={account} setAccount1={setAccount} owner={web3Api.owner}/>}/>
        <Route exact path="/admin" element={<Admin contract={web3Api.contract} account1={account}/>} />
        <Route exact path="/voter" element={<Voter contract={web3Api.contract} account1={account}/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
