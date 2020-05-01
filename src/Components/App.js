import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import styled, { ThemeProvider } from "styled-components";
import { HashRouter as Router } from "react-router-dom";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Routes from "./Routes";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 30px auto 0;
  max-width: ${(props) => props.theme.maxWidth};
  padding-bottom: 44px;
`;

export default () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <>
            {isLoggedIn && <Header />}
            <Wrapper>
              <Routes isLoggedIn={isLoggedIn} />
              <Footer />
            </Wrapper>
          </>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  );
};
