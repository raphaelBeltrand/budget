import gql from "graphql-tag";

export const GET_RECURRING_ENTRIES = gql`
  query RecurringEntries($kind: String!) {
    entries: recurringEntries(kind: $kind) {
      id
      value
      kind
      label
      startMonth
      startYear
      endMonth
      endYear
      periodicity
      parentEntry {
        id
        label
      }
    }
  }
`;

export const GET_EXCEPTIONAL_ENTRIES = gql`
  query ExceptionalEntries($kind: String!) {
    entries: exceptionalEntries(kind: $kind) {
      id
      label
      value
      month
      year
      kind
    }
  }
`;

export const GET_BUDGET_FOR_SELECTED_MONTH = gql`
  query MonthlyBudget {
    budget: monthlyBudget {
      id
      value
    }
  }
`;
