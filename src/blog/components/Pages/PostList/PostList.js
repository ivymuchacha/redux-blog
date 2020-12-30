import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getSomePosts } from "../../../redux/reducers/postReducer";
import { MEDIA_QUERY } from "../../../utils";

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
  border-bottom: 1px solid #bfc0c0;
  padding: 20px;
  align-items: center;
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
  font-size: 20px;
  text-decoration: none;
  color: #2d3142;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 700px;
  white-space: nowrap;
  ${MEDIA_QUERY} {
    white-space: pre-line;
    line-height: 1.5em;
  }
`;

const PostTime = styled.div`
  color: #4f5d75;
  min-width: 190px;
  margin-left: 10px;
  ${MEDIA_QUERY} {
    padding-top: 10px;
  }
`;

const Paginator = styled.div`
  display: flex;
  justify-content: center;
`;
const Page = styled.div`
  width: 10px;
  margin-top: 20px;
  padding: 5px 10px;
  background: #ef8354;
  color: #ffffff;
  cursor: pointer;
  & + & {
    margin-left: 5px;
  }
`;

const Loading = styled.div`
  display: flex;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  justify-content: center;
  font-size: 25px;
  text-align: center;
  align-items: center;
`;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
      <PostTime>{new Date(post.createdAt).toLocaleString()}</PostTime>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.objectOf(PropTypes.object),
};

function PostList() {
  const [pages, setPages] = useState([1]);
  const [allPages, setAllPages] = useState([]);
  const dispatch = useDispatch();
  const posts = useSelector((store) => store.posts.posts);
  const isLoading = useSelector((store) => store.posts.isLoadingPost);
  const limitPosts = useSelector((store) => store.posts.limitPosts);

  useEffect(() => {
    dispatch(getAllPosts()).then((res) => {
      if (res) {
        const listOfPage = [];
        for (let i = 1; i <= Math.ceil(res.length / 5); i += 1) {
          listOfPage.push(i);
        }
        setAllPages(listOfPage);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(getSomePosts(pages));
  }, [pages, dispatch]);

  const handleClick = (page) => {
    setPages(page);
  };

  return (
    <Root>
      {isLoading && <Loading>載入中</Loading>}
      {limitPosts &&
        limitPosts.map((post) => <Post key={post.id} post={post} />)}
      <Paginator>
        {allPages.map((page) => (
          <Page key={page} onClick={() => handleClick(page)}>
            {page}
          </Page>
        ))}
      </Paginator>
    </Root>
  );
}

export default PostList;
