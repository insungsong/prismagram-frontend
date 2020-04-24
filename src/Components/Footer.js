import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const Link = styled.a`
  color: ${(props) => props.theme.darkBlueColor};
`;

const Copyrigt = styled.span`
  color: ${(props) => props.theme.darkGrayColor};
`;

export default () => (
  <Footer>
    <List>
      <ListItem>
        <Link href="#">소개 </Link>
      </ListItem>
      <ListItem>
        <Link href="#">도움말</Link>
      </ListItem>
      <ListItem>
        <Link href="#">홍보센터 </Link>
      </ListItem>
      <ListItem>
        <Link href="#">API </Link>
      </ListItem>
      <ListItem>
        <Link href="#">채용정보 </Link>
      </ListItem>
      <ListItem>
        <Link href="#">개인정보처리방침 </Link>
      </ListItem>
      <ListItem>
        <Link href="#">약관 </Link>
      </ListItem>
      <ListItem>
        <Link href="#">위치 </Link>
      </ListItem>
      <ListItem>
        <Link href="#">인기 계정 </Link>
      </ListItem>
      <ListItem>
        <Link href="#">해시태그 </Link>
      </ListItem>
      <ListItem>
        <Link href="#">언어</Link>
      </ListItem>
    </List>
    <Copyrigt>InstaClone {new Date().getFullYear()} &copy;</Copyrigt>
  </Footer>
);
