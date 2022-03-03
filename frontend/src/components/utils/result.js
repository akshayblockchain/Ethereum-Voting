import React,{useState,useEffect} from 'react'
import { Table,Message } from 'semantic-ui-react';

export default function Result({contract,account1}) {
  const[candidate,setCandidate]=useState([]);
  const[errorMessage,setErrorMessage]=useState('');
  const[flag,setFlag]=useState(false);
  const[result,setResult]=useState('');
  let num=0;
  useEffect(() => {
    let check=async()=>{
      setCandidate(await contract.methods.get_candidateList().call());
      let flag = await contract.methods.flag().call();
      flag===true?setErrorMessage("Voting has Stared,you cannot See Result!"):setErrorMessage("");
      setFlag(flag);
      setResult(await contract.methods.resultFlag().call());
    }
    check();
  }, [contract])
  const candidateList = candidate.map((cand)=>{
    return(
      <Table.Row key={cand}>
        <Table.Cell>{num+=1}</Table.Cell>
        <Table.Cell>{cand.name}</Table.Cell>
        <Table.Cell>{cand.age}</Table.Cell>
        <Table.Cell>{cand.party}</Table.Cell>
        <Table.Cell>{cand.votes}</Table.Cell>
      </Table.Row>)
    });
  return (
    (result!==String(0))?(flag===false)?<Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>NAME</Table.HeaderCell>
        <Table.HeaderCell>AGE</Table.HeaderCell>
        <Table.HeaderCell>PARTY</Table.HeaderCell>
        <Table.HeaderCell>VOTES</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
    {candidateList}
    </Table.Body>
  </Table>:<Message error header='Oops' content={errorMessage}/>:<Message error header='Error' content={'Voting is not Complited Yet!!'}/>
  )
}
