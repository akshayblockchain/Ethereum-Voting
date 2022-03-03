import React,{ useState,useEffect } from 'react'
import { Button, Form, Icon, Message} from 'semantic-ui-react'

export default function AddCandidate({contract,account1}) {
  const[name,setName]=useState('');
  const[age,setAge]=useState('');
  const[party,setParty]=useState('');
  const[errorMessage,setErrorMessage]=useState('');
  const[loading,setLoading]=useState(false);
  const[flag,setFlag]=useState(false);

  useEffect(() => {
      let check=async()=>{
        let flag = await contract.methods.flag().call();
        flag===true?setErrorMessage("Voting has Stared,you cannot add Candidate!"):setErrorMessage("");
        setFlag(flag);
      } 
      check();   
  }, [contract])
  
  const contractFun= async e=>{
    e.preventDefault();
    setLoading(true);
    try{
      (name&&age&&party)?await contract.methods.addCandidate(name,age,party).send({from: account1}):setErrorMessage('Enter all Details and then Press Add');
    }catch(err){
      setErrorMessage(err.message);
    } 
    setLoading(false);
  };
  return(
    (flag===false)?<Form onSubmit={contractFun} error={errorMessage!==''}>
    <Message error header='Oops' content={errorMessage}/>
    <h3>Add New Candidate Details</h3>
    <Form.Field>
      <label>Name</label>
      <input placeholder='Enter Full Name' value={name} onChange={e=>setName(e.target.value)}/>
    </Form.Field>
    <Form.Field>
      <label>Age</label>
      <input placeholder='Enter the Age' onChange={e=>setAge(e.target.value)} value={age}/>
    </Form.Field>
    <Form.Field>
      <label>Party</label>
      <input placeholder='Party Name' onChange={e=>setParty(e.target.value)} value={party}/>
    </Form.Field>
    <Button primary icon type='submit' loading={loading}>
      <Icon name='plus circle'/> 
       Add 
    </Button>
  </Form>:<Message error header='Oops' content={errorMessage}/>
  )
}
