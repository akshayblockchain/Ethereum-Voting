import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, Header, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

export default function HeaderPage({account1,setAccount1,owner}) {
  let navigate = useNavigate();
  return ( 
    <div>
      <Segment inverted>
        <Header as='h2' inverted textAlign='center' color='red'>
          Online Voting
        </Header>
      </Segment>
      <Menu size='small'>
        <Link to="/">
          <Menu.Item content='Voting'/>
        </Link>
        <Menu.Item content={`Your Address : ${String(account1)}`}/>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button color={account1===null?"red":"green"} onClick ={async ()=>{
              const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
              setAccount1(String(accounts));
              alert("Successfully Connected to Metamask");
              if(owner.toLowerCase() === String(accounts)){
                navigate('/admin');
              }
              else{
                navigate('/voter');
              }
            }} disabled={account1===null?false:true} content={account1===null?"Connect":"Connected"}></Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  )
}
