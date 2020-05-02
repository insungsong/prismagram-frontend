import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { HeartEmpty, Compass, User, Logo } from "./Icons";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../SharedQuerise";

const Header = styled.header`
  width: 100%;
  border: 0;
  background-color: white;
  border-bottom: ${(props) => props.theme.boxBorder};
  border-radius: 0px;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0px;
  z-index: 1;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;

  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;

  &::placeholder {
    opacity: 0.8;
    font-weight: 200px;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 25px;
  }
`;

export default withRouter(({ history }) => {
  const search = useInput("");
  const { loading, data } = useQuery(ME);
  if (loading) return "";
  const { me } = data;
  const onSearchSubmit = (event) => {
    event.preventDefault();
    history.push(`/search?term=${search.value}`);
    //history는 url을 변경시켜주는 함수역할을 한다.
    // /를사용하면 ?가 나오기 전까지 path이고 ?의 기준으로 ?뒤에나오는것은, search:<-부분에 들어간다.
  };
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">
            <Logo />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            <SearchInput
              value={search.value}
              onChange={search.onChange}
              placeholder="Search"
            />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/explore">
            <Compass />
          </HeaderLink>
          <HeaderLink to="/notifications">
            <HeartEmpty />
          </HeaderLink>
          {!data.me ? (
            <HeaderLink to="/#">
              <User />
            </HeaderLink>
          ) : (
            <HeaderLink to={data.me.username}>
              <User />
            </HeaderLink>
          )}
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});
