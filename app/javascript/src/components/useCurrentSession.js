import React from "react";
import { GET_SESSION } from "../queries/globalQueries";
import { Query, useQuery } from "@apollo/client";

export default () => {
  const { data, loading, error } = useQuery(GET_SESSION);

  if (loading || !data) return null;
  return data.session;
};
