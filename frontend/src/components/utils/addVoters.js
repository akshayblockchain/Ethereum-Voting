import React, { useState,useEffect } from 'react'
import { Button,Form,Icon,Message } from 'semantic-ui-react'

export default function AddVoters({contract,account1}) {
const[name,setName]=useState('');
const[id,setId]=useState('');
const[errorMessage,setErrorMessage]=useState('');
const[loading,setLoading]=useState(false);
const[flag,setFlag]=useState(false);
useEffect(() => {
  let check=async()=>{
    let flag = await contract.methods.flag().call();
    flag===true?setErrorMessage("Voting has Stared,you cannot Add!"):setErrorMessage("");
    setFlag(flag);
    } 
    check();  
}, [contract])

const submitVoter=async(e)=>{
  e.preventDefault();
  setLoading(true);
  try{
    (name && id)?await contract.methods.addVoters(name,id).send({from:account1}):setErrorMessage('Enter all Detalis and then Press Add');
  }catch(err){
    setErrorMessage(err.message);
  }
  setLoading(false);
}
  return (
    (flag===false)?<Form onSubmit={submitVoter} error={errorMessage!==''}>
      <Message error header='Oops' content={errorMessage}/>
      <h3>Add Your Details.</h3>
      <Form.Field>
        <label>Full Name</label>
          <input placeholder='Enter your Full Name' value={name} onChange={(e)=> setName(e.target.value) } />
      </Form.Field>
      <Form.Field>
        <label>Voter ID Number</label>
          <input placeholder='Enter your Voter ID number' value={id} onChange={(e)=> setId(e.target.value)} />
      </Form.Field>
    <Button primary icon type='submit' loading={loading}>
      <Icon name='plus circle'/>
        Add
    </Button>
    </Form>:<Message error header='Oops' content={errorMessage}/>
  )
}
