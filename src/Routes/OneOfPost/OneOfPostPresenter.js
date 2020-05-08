import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "../../Components/Avatar";
import { Link } from "react-router-dom";
import FatText from "../../Components/FatText";
import TextareaAutosize from "react-autosize-textarea/lib";
import { useMutation } from "react-apollo-hooks";
import { ADD_COMMENT } from "../../Components/Post/PostQuerise";
import useInput from "../../Hooks/useInput";

const Header = styled.header`
  display: flex;
  height: 80vh;
`;

const Wrapper = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  display: flex;
  user-select: none;
  margin-bottom: 25px;
  a {
    color: inherit;
  }
`;

const WrapperRow = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  user-select: none;
  margin-bottom: 25px;
  a {
    color: inherit;
  }
`;

const UserColumn = styled.span`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const FileBox = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`;

const File = styled.img`
  position: relative;
  max-width: 100%;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

const Comments = styled.ul`
  margin-top: 10px;
`;

const Comment = styled.li`
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
  display: block;
`;

const UserBox = styled.div`
  display: flex;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

export default ({
  id,
  username,
  avatar,
  location,
  isLiked,
  files,
  url,
  likeCount,
  comments
}) => {
  const [addCommentMutaion] = useMutation(ADD_COMMENT);
  const [addcommentS, setAddCommnetS] = useState([]);

  const comment = useInput("");

  const onChange = (e) => {
    e.preventDefault();
    const { target } = e;
    console.log(target);
  };

  const onkeyPress = async (event) => {
    const { which } = event;
    if (which === 13) {
      event.preventDefault();
      try {
        console.log(id, comment);
        const {
          data: { addComment }
        } = await addCommentMutaion({
          variables: { postId: id, text: comment.value }
        });
        console.log(addComment);
        setAddCommnetS([...addcommentS, addComment]);
        comment.setValue("");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Header>
        <Wrapper>
          <FileBox>
            {files.map((file) => {
              return <File id={file.id} key={file.id} src={file.url} />;
            })}
          </FileBox>
        </Wrapper>
        <WrapperRow>
          <UserBox>
            <Avatar size="md" url={avatar} />
            <UserColumn>
              <Link to={`/${username}`}>
                <FatText text={username} />
              </Link>
              <Location>{location}</Location>
            </UserColumn>
          </UserBox>
          <Comments>
            {comments.map((comment) => {
              return (
                <Comment key={comment.id}>
                  <FatText text={comment.user.username} />
                  {comment.text}
                </Comment>
              );
            })}
          </Comments>
          {addcommentS.map((comment) => (
            <Comment key={comment.id}>
              <FatText text={comment.user.username} />
              {comment.text}
            </Comment>
          ))}
          <Textarea
            onKeyPress={onkeyPress}
            placeholder={"댓글을 입력하세요..."}
            value={comment.value}
            onChange={comment.onChange}
          />
        </WrapperRow>
      </Header>
    </>
  );
};
