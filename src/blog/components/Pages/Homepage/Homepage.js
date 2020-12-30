import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { MEDIA_QUERY } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPosts } from "../../../redux/reducers/postReducer";

const Root = styled.div`
  margin: 0 auto;
  width: 80%;
  ${MEDIA_QUERY} {
    width: 95%;
  }
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #bfc0c0;
  padding: 20px;
  :hover {
    background: #bfc0c0;
  }
  ${MEDIA_QUERY} {
    display: block;
  }
`;

const PostTitle = styled(Link)`
  display: inline-block;
  align-items: center;
  max-width: 700px;
  font-size: 20px;
  text-decoration: none;
  color: #2d3142;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 10px;
  ${MEDIA_QUERY} {
    white-space: pre-line;
    line-height: 1.5em;
  }
`;

const PostTime = styled.div`
  display: flex;
  align-items: center;
  min-width: 190px;
  color: #4f5d75;
  margin-left: 10px;
  ${MEDIA_QUERY} {
    padding-top: 10px;
  }
`;

const Button = styled(Link)`
  margin-left: 10px;
  padding: 10px;
  border: 1px solid #ef8354;
  background: white;
  color: #ef8354;
  cursor: pointer;
  border-radius: 5px;
  text-decoration: none;
  font-size: 14px;
  align-items: center;
  display: flex;
}
`;

const Flex = styled.div`
  display: flex;
`;

const Setting = styled.div`
  display: flex;
  width: 120px;
  ${MEDIA_QUERY} {
    padding-top: 10px;
  }
`;

function Post({ post, user, handleDelete }) {
  return (
    <PostContainer>
      <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
      <Flex>
        <PostTime>{new Date(post.createdAt).toLocaleString()}</PostTime>
        {user && (
          <Setting>
            <Button to={`/edit-post/${post.id}`}>編輯</Button>
            <Button
              onClick={() => {
                handleDelete(post.id);
              }}
            >
              刪除
            </Button>
          </Setting>
        )}
      </Flex>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.objectOf(PropTypes.object),
  user: PropTypes.string,
  handleDelete: PropTypes.func,
};

function Homepage() {
  const user = useSelector((store) => store.users.user);
  const posts = useSelector((store) => store.posts.posts);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deletePost(id)).then(() => {
      dispatch(getAllPosts());
    });
  };

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <Root>
      {posts &&
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            user={user}
            handleDelete={handleDelete}
          />
        ))}
    </Root>
  );
}

export default Homepage;
