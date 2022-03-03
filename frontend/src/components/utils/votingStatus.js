import React, { useEffect, useState } from 'react'
import { Button, Header, Segment } from 'semantic-ui-react'

export default function Status({contract,account1}) {
  const[flag,setFlag]=useState(false);
  const[length,setLength]=useState('');
  const[loading,setLoading]=useState(false);
  useEffect(() => {
    let check=async()=>{
      setLength(await contract.methods.get_length().call());
      setFlag(await contract.methods.flag().call());
    }
    check();
  }, [contract,loading])
  let changeFlag=async()=>{
    setLoading(true);
    await contract.methods.set_flag().send({from:account1});
    setLoading(false);
  }
  return (
    <div>
      <Segment placeholder>
    <Header icon>
      {length===String(0)?'Please first Add Candidate':flag===false?'Start the Voting':'You can Stop Voting as Time over'}
    </Header>
    <Segment.Inline>
      <Button color="green" onClick={changeFlag} loading={loading} disabled={length===String(0)?true:flag===false?false:true}>Start Voting</Button>
      <Button color="google plus" onClick={changeFlag} loading={loading} disabled={length===String(0)?true:flag===true?false:true}>Stop Voting</Button>
    </Segment.Inline>
  </Segment>
    </div>
  )
}
