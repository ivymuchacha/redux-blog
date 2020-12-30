import React, { useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  getPost,
  deletePost,
  setNullEditPost,
} from "../../../redux/reducers/postReducer";
import { MEDIA_QUERY } from "../../../utils";

const Root = styled.div`
  margin: 0 auto;
  width: 80%;
  ${MEDIA_QUERY} {
    width: 95%;
  }
`;

const PostContainer = styled.div`
  justify-content: space-between;
  border-bottom: 1px solid grey;
  padding: 20px;
  ${MEDIA_QUERY} {
    display: block;
  }
`;

const PostTitle = styled.div`
  font-size: 20px;
  text-decoration: none;
  color: #2d3142;
`;

const PostTime = styled.div`
  color: #4f5d75;
  display: flex;
  align-items: center;
  padding-top: 10px;
`;

const PostContent = styled.div`
  padding: 20px;
  color: #4f5d75;
  line-height: 2em;
  word-break: break-all;
  white-space: break-spaces;
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
  text-align: center;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

function Page() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((store) => store.posts.isLoadingPost);
  const post = useSelector((store) => store.posts.post);
  const user = useSelector((store) => store.users.user);
  const handleDelete = (postId) => {
    dispatch(deletePost(postId)).then(() => {
      history.push("/");
    });
  };

  useEffect(() => {
    dispatch(getPost(id));

    return () => {
      dispatch(setNullEditPost());
    };
  }, [id, dispatch]);

  return (
    <Root>
      {post && (
        <>
          <PostContainer>
            <PostTitle>{post.title}</PostTitle>
            <Flex>
              <PostTime>{new Date(post.createdAt).toLocaleString()}</PostTime>
              <div>
                {user && <Button to={`/edit-post/${post.id}`}>編輯</Button>}
                {user && (
                  <Button
                    onClick={() => {
                      handleDelete(post.id);
                    }}
                  >
                    刪除
                  </Button>
                )}
              </div>
            </Flex>
          </PostContainer>
          <PostContent>{post.body}</PostContent>
        </>
      )}
      {isLoading && <Loading>載入中</Loading>}
    </Root>
  );
}

export default Page;
