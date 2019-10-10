import React from 'react';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_SCHEDULE = gql`
  {
    schedule {
      name
      id
    }
  }
`;

export default function TournamentList() {
    const { loading, error, data } = useQuery(GET_SCHEDULE);
    if (loading) return '';
    if (error) return `Error! ${error.message}`;
    return (
        <List>
            {data.schedule.map((tournament, index) => (
                <ListItem button key={tournament.id}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={tournament.name} />
                </ListItem>
            ))}
        </List>
    )
}