import Cookies from "universal-cookie";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const cookies = new Cookies();

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: "/graphql",
    headers: setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: `Scritcher ${cookies.get("csrf-token")}`,
          "X-CSRF-Token": cookies.get("csrf-token"),
        },
      };
    }),
  }),
});

export default apolloClient;
