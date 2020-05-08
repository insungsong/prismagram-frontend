import React from "react";
import OneOfPostPresenter from "./OneOfPostPresenter";
import { withRouter } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../Components/Loader";

const GET_SEE_FEED = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

export default withRouter(
  ({
    match: {
      params: { id }
    }
  }) => {
    const { data, loading } = useQuery(GET_SEE_FEED);

    if (loading) {
      return <Loader />;
    } else {
      return data.seeFeed.map((feed) => {
        if (id === feed.id) {
          return (
            <OneOfPostPresenter
              id={feed.id}
              key={feed.id}
              username={feed.user.username}
              avatar={feed.user.avatar}
              location={feed.location}
              isLiked={feed.isLiked}
              files={feed.files}
              likeCount={feed.likeCount}
              comments={feed.comments}
            />
          );
        }
      });
    }
  }
);
