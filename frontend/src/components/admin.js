import React, { useState } from 'react'
import { Menu,Grid, Segment  } from 'semantic-ui-react'
import AddCandidate from './utils/addCandidate'
import Status from './utils/votingStatus'
import Result from './utils/result'
import List from './utils/list'

export default function Admin({contract,account1}) {
const [item,setItem]=useState('');
  return ( 
    <Grid>
    <Grid.Column width={4}>
     <Menu fluid inverted vertical pointing>
        <Menu.Item
          name='Add Candidate'
          active={item==='add'}
          onClick={()=> setItem('add')}
        />
        <Menu.Item
          name='Candidate List'
          active={item==='list'}
          onClick={()=> setItem('list')}
        />
        <Menu.Item
          name='Voting Status'
          active={item==='status'}
          onClick={()=> setItem('status')}
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
    {item==='add'?<AddCandidate contract={contract} account1={account1}/>:item==='status'?<Status contract={contract} account1={account1}/>:item==='result'?<Result contract={contract} account1={account1}/>:item==='list'?<List contract={contract} account1={account1}/>:<h1>Welcome Admin</h1>}
  </Segment>
</Grid.Column>
</Grid>
   )
}
