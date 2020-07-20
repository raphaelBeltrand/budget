import Cookies from "universal-cookie";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const cache = new InMemoryCache();

const cookies = new Cookies();

const token = localStorage.getItem("token");

let loaderCount = 0;
const apolloClient = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: "https://ezpzbudget.com/graphql",
    headers: {
      authorization: `Scritcher ${cookies.get("csrf-token")}`,
      "X-CSRF-Token": cookies.get("csrf-token"),
    },
    credentials: "same-origin",
  }),
  fetch: (input, init) => {
    // this whole function is pretty ugly

    const globalProgresses = document.querySelectorAll(".globalProgress");
    loaderCount++;
    Array.from(globalProgresses).forEach((globalProgress) => {
      globalProgress.style.display = "block";
    });

    const handleResponse = (response) => {
      loaderCount--;

      if (loaderCount === 0) {
        Array.from(globalProgresses).forEach((globalProgress) => {
          globalProgress.style.display = "none";
        });
      }
      return response;
    };

    return fetch(input, init).then(handleResponse).catch(handleResponse);
  },
});

export default apolloClient;
