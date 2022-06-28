import { ApolloClient, InMemoryCache } from "@apollo/client";

const URI = "https://storefornt-task-endpoint.herokuapp.com";

export const client = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache(),
});
