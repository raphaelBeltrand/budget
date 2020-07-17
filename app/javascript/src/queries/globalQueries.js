import gql from "graphql-tag";

export const DELETE_SESSION = gql`
  mutation deleteSession($input: DeleteSessionInput!) {
    deleteSession(input: $input) {
      session {
        id
      }
    }
  }
`;

export const CREATE_SESSION = gql`
  mutation createSession($input: CreateSessionInput!) {
    createSession(input: $input) {
      session {
        id
        user {
          id
        }
      }
    }
  }
`;

export const GET_SESSION = gql`
  query Session {
    session {
      id
      user {
        id
        name
        selectedMonth
        selectedYear
      }
    }
  }
`;
