import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
  uri: "http://localhost:4000",
  clientState: {
    //cache값을 받을때 효휼적으로 사용가능하다.
    defaults,
    resolvers
  }
});
