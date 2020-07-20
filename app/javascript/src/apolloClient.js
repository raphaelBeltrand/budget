import Cookies from "universal-cookie";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const cache = new InMemoryCache();

const cookies = new Cookies();

const token = localStorage.getItem("token");

let loaderCount = 0;
const apolloClient = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: "/graphql",
    headers: {
      authorization: `Scritcher ${cookies.get("csrf-token")}`,
      "X-CSRF-Token": cookies.get("csrf-token"),
    },
  }),
});

export default apolloClient;
