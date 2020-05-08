import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT, DELETE_COMMENT } from "./PostQuerise";

import { toast } from "react-toastify";

export const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  caption,
  location
}) => {
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [deleteCommentS, setDeleteCommentS] = useState("");
  const [selfComments, setSelfComments] = useState([]);
  const comment = useInput("");

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value }
  });

  const [deleteCommentMutation] = useMutation(DELETE_COMMENT);

  const slide = () => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setCurrentItem(0), 3000);
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 3000);
    }
  };
  useEffect(() => {
    slide();
  }, [currentItem]);
  //그리고 currentItem이 변할때마다 실행되는 것이다 뭐가 다시 slide()가

  const toggleLike = () => {
    toggleLikeMutation();
    if (isLikedS === true) {
      setIsLiked(false);
      setLikeCount(likeCountS - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountS + 1);
    }
  };

  const onkeyPress = async (event) => {
    const { which } = event;
    if (which === 13) {
      event.preventDefault();
      try {
        const {
          data: { addComment }
        } = await addCommentMutation();

        setSelfComments([...selfComments, addComment]);
        comment.setValue("");
      } catch {
        toast.error("댓글을 입력할 수 없습니다.");
      }
      //addCommentMutation();
    }
    return;
  };

  const CommentDeadProcessing = async (data) => {
    const commentBox = comments.map((comment) => comment.id);
    const dataValue = commentBox.indexOf(data);

    try {
      if (dataValue !== null) {
        await deleteCommentMutation({
          variables: { commentId: data }
        });
        comments.splice(dataValue, 1);
        setDeleteCommentS(dataValue);
      } else {
        console.log("<svg>의 id를 가져올 수 없었습니다");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("useEffect용 console");
  }, [deleteCommentS]);

  // for문 사용 delete comment문
  // for (var i = 0; i <= commentBox.length; i++) {
  //   if (data === commentBox[i]) {
  //     await deleteCommentMutation({
  //       variables: { commentId: data }
  //     });
  //     delete comments[i];
  //     //comments.splice(i, 1);
  //   } else {
  //     console.log(
  //       "<svg>가 아닌 path를 누른 오류가 발생하여 id를 얻어올 수 없었습니다"
  //     );
  //   }
  // }

  return (
    <PostPresenter
      user={user}
      location={location}
      caption={caption}
      files={files}
      likeCount={likeCountS}
      isLiked={isLikedS}
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onkeyPress={onkeyPress}
      selfComments={selfComments}
      CommentDeadProcessing={CommentDeadProcessing}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired,
      createdAt: PropTypes.string
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired
};

export default PostContainer;
