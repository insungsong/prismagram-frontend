import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 318px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

export default ({
  action,
  username,
  firstName,
  lastName,
  email,
  secret,
  setAction,
  onSubmit
}) => {
  return (
    <Wrapper>
      <Form>
        {action === "logIn" && (
          <>
            <Helmet>
              <title>Log In | Prismagram</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <Input
                placeholder={"Email"}
                value={email.value}
                onChange={email.onChange}
                type="email"
              />
              <Button text={"Log In"} />
            </form>
          </>
        )}
        {action === "signUp" && (
          <>
            <Helmet>
              <title>Sing Up | Prismagram</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <Input
                placeholder={"First Name"}
                value={firstName.value}
                onChange={firstName.onChange}
              />
              <Input
                placeholder={"Last Name"}
                value={lastName.value}
                onChange={lastName.onChange}
              />
              <Input
                placeholder={"Email"}
                value={email.value}
                onChange={email.onChange}
                type="email"
              />
              <Input
                placeholder={"Username"}
                value={username.value}
                onChange={username.onChange}
              />
              <Button text={"Sign Up"} />
            </form>
          </>
        )}
        {action === "confirm" && (
          <>
            <Helmet>
              <title>Confirm Secret | Prismagram</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <Input
                placeholder="이메일로 할당한 secretkey를 입력하세요"
                required
                value={secret.value}
                onChange={secret.onChange}
              />
              <Button text={"계속하기"} />
            </form>
          </>
        )}
      </Form>

      {action !== "confirm" && (
        <StateChanger>
          {action === "logIn" ? (
            <>
              계정이 없으신가요?
              <Link onClick={() => setAction("signUp")}>회원가입</Link>
            </>
          ) : (
            <>
              회원이신가요?{" "}
              <Link onClick={() => setAction("logIn")}>로그인</Link>
            </>
          )}
        </StateChanger>
      )}
    </Wrapper>
  );
};
