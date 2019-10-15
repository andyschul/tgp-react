import React from 'react';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from "react-router"
import gql from 'graphql-tag';

const GET_GROUPS = gql`
  {
    user {
      groups {
        id
        groupName
        role
        teamName
      }
    }
  }
`;

export default function GroupList() {
    let history = useHistory()
    const { loading, error, data } = useQuery(GET_GROUPS);
    if (loading) return '';
    if (error) return `Error! ${error.message}`;
    console.log(data)
    return (
        <List>
            {data.user.groups.map((group, index) => (
                <ListItem button key={group.id} onClick={() => history.push(`/groups/${group.id}`)}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={group.groupName} />
                </ListItem>
            ))}
        </List>
    )
}