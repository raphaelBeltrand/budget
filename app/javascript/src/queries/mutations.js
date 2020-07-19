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

// export const SET_PREVIOUS_MONTH = gql`
//   mutation setPreviousMonth {
//     setPreviousMonth {
//       errors
//     }
//   }
// `;

// export const SET_NEXT_MONTH = gql`
//   mutation setNextMonth {
//     setNextMonth {
//       errors
//     }
//   }
// `;

export const NEW_RECURRENT_ENTRY = gql`
  mutation newRecurrentEntry($input: NewRecurrentEntryInput!) {
    newRecurrentEntry(input: $input) {
      entry {
        id
        label
        value
        kind
        startMonth
        startYear
        endMonth
        endYear
        periodicity
      }
      errors
    }
  }
`;

export const UPDATE_RECURRENT_ENTRY = gql`
  mutation updateRecurrentEntry($input: UpdateRecurrentEntryInput!) {
    updateRecurrentEntry(input: $input) {
      entry {
        id
        label
        value
        kind
        startMonth
        startYear
        endMonth
        endYear
        periodicity
      }
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

export const DELETE_EXCEPTIONAL_ENTRY = gql`
  mutation deleteExceptionalEntry($input: DeleteExceptionalEntryInput!) {
    deleteExceptionalEntry(input: $input) {
      errors
    }
  }
`;

export const DELETE_RECURRENT_ENTRY = gql`
  mutation deleteRecurrentEntry($input: DeleteRecurrentEntryInput!) {
    deleteRecurrentEntry(input: $input) {
      errors
    }
  }
`;
