import { gql } from '@apollo/client/core';

export const createInvestigatorMutation = gql`
  mutation($name: String!, $dateOfBirth: String!, $sex: Sex!) {
    createInvestigator(
      input: { name: $name, sex: $sex, dateOfBirth: $dateOfBirth }
    ) {
      id
      name
      email
      createdAt
    }
  }
`;
