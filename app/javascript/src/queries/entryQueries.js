import gql from "graphql-tag";

export const GET_RECURRING_ENTRIES = gql`
  query RecurringEntries($kind: String!) {
    entries: recurringEntries(kind: $kind) {
      id
      label
      value
    }
  }
`;

export const GET_EXCEPTIONAL_ENTRIES = gql`
  query ExceptionalEntries($kind: String!) {
    entries: exceptionalEntries(kind: $kind) {
      id
      label
      value
    }
  }
`;
