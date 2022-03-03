import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import List from './list'
import { Button, Header, Segment, Menu, Dropdown, Message } from 'semantic-ui-react'

export default function VotingPanel({contract,account1}) {
  const[index,setIndex]=useState();
  const[loading,setLoading]=useState(false);
  const[length,setLength]=useState(0);
  const[errorMessage,setErrorMessage]=useState('');
  const[votted,setVotted]=useState();
  useEffect(() => {
    let getLength=async()=>{
      setLength(await contract.methods.get_length().call());
      setVotted(await contract.methods.get_vottedDetails().call({from:account1}));
    }
    getLength();
  }, [contract,account1])
  
  const vote=()=>{
    let voteCandidate=async()=>{
      setLoading(true);
      try{
        await contract.methods.vote(index).send({from:account1});
      }catch(err){
        setErrorMessage(err.message);
      }
      setLoading(false);
    }
    voteCandidate();
  }
  const getOptions = (number, prefix = 'Choice ') =>
  _.times(number, (index) => ({
    key: index,
    text: `${prefix}${index}`,
    value: index,
  }))
  
  return (
    (votted)?<Message error header='Oops' content={'You have Already Votted'}/>:
    (errorMessage==='')?<>
      <List contract={contract} account1={account1} />
      <Segment placeholder>
      <Header icon>
        Select the Candidate & Click the 'VOTE' Button
      </Header>
      <Segment.Inline>
      <Menu compact>
      <Dropdown
        onChange={(e, { value }) => setIndex(value)}
        options={getOptions(length)}
        placeholder='Select ID'
        selection
        value={index}
      />
      {console.log(votted)}
      </Menu>
      <Button primary onClick={vote} loading={loading} >VOTE</Button>
      </Segment.Inline>
      </Segment></>:<Message error header='Oops' content={errorMessage}/>
  )
}
