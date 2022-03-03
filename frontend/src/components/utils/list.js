import React,{useEffect,useState} from 'react'
import { Table } from 'semantic-ui-react';

export default function List({contract,account1}) {
  const[candidate,setCandidate]=useState([]);
  let num=0;
  useEffect(() => {
    let check=async()=>{
      setCandidate(await contract.methods.get_candidateList().call());
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
    </Table.Row>)});
  return (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>NAME</Table.HeaderCell>
        <Table.HeaderCell>AGE</Table.HeaderCell>
        <Table.HeaderCell>PARTY</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
    {candidateList}
    </Table.Body>
  </Table>    
  )
}
