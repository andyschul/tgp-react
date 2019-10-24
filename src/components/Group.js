import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import TournamentList from './TournamentList'
import InviteList from './InviteList'

const GET_GROUP_DETAILS = gql`
  query GroupDetails($groupId: ID!) {
    group(id: $groupId) {
        id
        groupName
        invites
        users {
            firstName
            lastName
            role
        }
    }
  }
`;

export default function Group(route) {
    const { data, loading, error } = useQuery(
        GET_GROUP_DETAILS,
        { variables: { groupId: route.match.params.id } }
    );
    if (loading) return '';
    if (error) return `Error! ${error.message}`;
    console.log(data)
    return (
        <div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>{data.group.groupName}</div>
            <div>Test</div>
            {data.group.invites.map(email => (
                <React.Fragment>
                <div>{email}</div>
                <button>remove</button>
                </React.Fragment>
            ))}
            <div>Test</div>
            <div>Test</div>
            {data.group.users.map(user => (
                <div>{user.firstName} {user.lastName}, {user.role}</div>
            ))}
            <TournamentList />
            <InviteList groupId={route.match.params.id} />
        </div>
    )
}