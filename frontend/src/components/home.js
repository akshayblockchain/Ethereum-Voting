import React from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';

export default function Home({account1,setAccount1,owner}) {
  let navigate = useNavigate();
  return (
    <Segment placeholder>
    <Header icon>
      <Icon name='globe' />
      Welcome to Online Voting Decentralize Application.
      Please Connect to Metamask.
    </Header>
      <Button color='green' onClick ={async ()=>{ 
        const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
        setAccount1(String(accounts));
        if(account1===null){alert("Successfully Connected to Metamask")}
        if(owner.toLowerCase() === String(accounts)){
          navigate('/admin');
        }
        else{
          navigate('/voter');
        }
        }} content={account1===null?"Connect to Metamask":"Back to Menu"}></Button>
  </Segment>
  )
}
