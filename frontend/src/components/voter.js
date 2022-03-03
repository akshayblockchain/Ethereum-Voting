import React, { useState } from 'react'
import { Menu,Grid, Segment  } from 'semantic-ui-react'
import AddVoters from './utils/addVoters';
import List from './utils/list';
import VotingPannel from './utils/votingPanel';
import Result from './utils/result';

export default function Voter({contract,account1}) {
  const [item,setItem]=useState('');
  return ( 
    <Grid>
    <Grid.Column width={4}>
     <Menu fluid inverted vertical pointing>
        <Menu.Item
          name='Add Voter'
          active={item==='add'}
          onClick={()=> setItem('add')}
        />
        <Menu.Item
          name='Candidate List'
          active={item==='list'}
          onClick={()=> setItem('list')}
        />
        <Menu.Item
          name='Voting Panel'
          active={item==='voting'}
          onClick={()=> setItem('voting')}
        />
        <Menu.Item
          name='Result'
          active={item==='result'}
          onClick={()=> setItem('result')}
        />
      </Menu>
      </Grid.Column>

<Grid.Column stretched width={12}>
  <Segment>
    {item==='add'?<AddVoters contract={contract} account1={account1}/>:item==='voting'?<VotingPannel contract={contract} account1={account1} />:item==='result'?<Result contract={contract} account1={account1}/>:item==='list'?<List contract={contract} account1={account1}/>:<h1>Welcome Voter</h1>}
  </Segment>
</Grid.Column>
</Grid>
)
}
