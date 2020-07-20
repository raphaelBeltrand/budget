import gql from "graphql-tag";

export const SIGN_UP = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      errors
    }
  }
`;

export const SIGN_OUT = gql`
  mutation signOut($input: SignOutInput!) {
    signOut(input: $input) {
      errors
    }
  }
`;

export const SIGN_IN = gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) {
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
        username
        selectedMonth
        selectedYear
        createdAt
      }
    }
  }
`;
