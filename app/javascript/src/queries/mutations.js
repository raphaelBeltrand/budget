import gql from "graphql-tag";

export const UPDATE_SELECTED_MONTH = gql`
  mutation updateSelectedMonth($input: UpdateSelectedMonthInput!) {
    updateSelectedMonth(input: $input) {
      month
      errors
    }
  }
`;

export const UPDATE_SELECTED_YEAR = gql`
  mutation updateSelectedYear($input: UpdateSelectedYearInput!) {
    updateSelectedYear(input: $input) {
      year
      errors
    }
  }
`;

export const NEW_EXCEPTIONAL_ENTRY = gql`
  mutation newExceptionalEntry($input: NewExceptionalEntryInput!) {
    newExceptionalEntry(input: $input) {
      entry {
        id
        label
        value
        kind
        month
        year
      }
      errors
    }
  }
`;

export const UPDATE_EXCEPTIONAL_ENTRY = gql`
  mutation updateExceptionalEntry($input: UpdateExceptionalEntryInput!) {
    updateExceptionalEntry(input: $input) {
      entry {
        id
        label
        value
        kind
        month
        year
      }
      errors
    }
  }
`;
