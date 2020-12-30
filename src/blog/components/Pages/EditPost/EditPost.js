import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  editPost,
  getPost,
  setNullEditPost,
} from "../../../redux/reducers/postReducer";
import { usePrevious, MEDIA_QUERY } from "../../../utils";

const Root = styled.div`
  margin: 0 auto;
  width: 80%;
  ${MEDIA_QUERY} {
    width: 95%;
  }
`;

const PostBoard = styled.form`
  background: #ef8354;
  margin: 10%;
  height: 500px;
  align-items: center;
  text-align: center;
  border: 1px solid #ef8354;
  padding-top: 40px;
  ${MEDIA_QUERY} {
    margin: 5% 0;
    height: 550px;
  }
`;
const Title = styled.h2`
  color: #ffffff;
`;
const InputContent = styled.div`
  width: 450px;
  margin: 0 auto;
  text-align: left;
  ${MEDIA_QUERY} {
    width: 95%;
    font-size: 16px;
  }
`;
const InputName = styled.div`
  font-size: 18px;
  color: #ffffff;
  margin: 5px;
`;
const Input = styled.textarea`
  padding: 5px;
  width: 450px;
  border: none;
  ${MEDIA_QUERY} {
    width: 95%;
    font-size: 16px;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px;
  border: none;
  background: white;
  color: #ef8354;
  cursor: pointer;
  border-radius: 5px;
  ${MEDIA_QUERY} {
    padding: 15px 20px;
    font-size: 16px;
  }
`;

const ErrorMessage = styled.h3`
  color: #2d3142;
`;

function PostInput({ inputName, inputType, value, onChange, rows }) {
  return (
    <div>
      <InputContent>
        <InputName>{inputName}</InputName>
        <Input rows={rows} type={inputType} onChange={onChange} value={value} />
      </InputContent>
    </div>
  );
}

PostInput.propTypes = {
  inputName: PropTypes.string,
  inputType: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  rows: PropTypes.number,
};

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const post = useSelector((store) => store.posts.post);
  const editPostResponse = useSelector((store) => store.posts.editPostResponse);
  const isLoadingNewPost = useSelector((store) => store.posts.isLoadingNewPost);
  const prevIsLoadingNewPost = usePrevious(isLoadingNewPost);

  const handleSubmit = (postId) => {
    setErrorMessage(null);
    if (!title || !body) {
      return setErrorMessage("Please Filled Out the Form.");
    }
    return dispatch(editPost(postId, { title, body }));
  };

  useEffect(() => {
    if (!isLoadingNewPost && !prevIsLoadingNewPost) {
      dispatch(getPost(id));
      if (post) {
        setTitle(post.title);
        setBody(post.body);
      }
    }

    if (!isLoadingNewPost && prevIsLoadingNewPost) {
      if (editPostResponse && editPostResponse.id) {
        history.push(`/post/${editPostResponse.id}`);
      }
    }

    return () => {
      dispatch(setNullEditPost());
    };
  }, [id, editPostResponse, history, isLoadingNewPost, prevIsLoadingNewPost]);

  return (
    <Root>
      <PostBoard onSubmit={() => handleSubmit(post.id)}>
        <Title>編輯文章</Title>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {post && (
          <PostInput
            inputName="Title："
            inputType="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        )}
        {post && (
          <PostInput
            inputName="Content："
            inputType="text"
            rows="10"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        )}
        <Button>Submit</Button>
      </PostBoard>
    </Root>
  );
}

export default EditPost;
