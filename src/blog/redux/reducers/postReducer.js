import { createSlice } from "@reduxjs/toolkit";
import {
  editPost as editPostAPI,
  getSomePosts as getSomePostsAPI,
  getPosts as getPostsAPI,
  getPost as getPostAPI,
  newPost,
  deletePost as deletePostAPI,
} from "../../WebAPI";

export const postReducer = createSlice({
  name: "posts",
  initialState: {
    isLoadingPost: false,
    limitPosts: null,
    posts: null,
    post: null,

    editPostResponse: null,
    newPostResponse: null,
    isLoadingNewPost: false,
  },
  reducers: {
    setIsLoadingPost: (state, action) => {
      state.isLoadingPost = action.payload;
    },

    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    setLimitPosts: (state, action) => {
      state.limitPosts = action.payload;
    },

    setPost: (state, action) => {
      state.post = action.payload;
    },

    setNewPostResponse: (state, action) => {
      state.newPostResponse = action.payload;
    },

    setIsLoadingNewPost: (state, action) => {
      state.isLoadingNewPost = action.payload;
    },

    setEditPostResponse: (state, action) => {
      state.editPostResponse = action.payload;
    },
  },
});

export const {
  setIsLoadingPost,
  setLimitPosts,
  setPosts,
  setPost,
  setNewPostResponse,
  setIsLoadingNewPost,
  setEditPostResponse,
} = postReducer.actions;

export const getAllPosts = () => (dispatch) => {
  return getPostsAPI().then((res) => {
    dispatch(setPosts(res));
    return res;
  });
};

export const getSomePosts = (page) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  getSomePostsAPI(page).then((res) => {
    dispatch(setLimitPosts(res));
    dispatch(setIsLoadingPost(false));
  });
};

export const getPost = (id) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  getPostAPI(id).then((res) => {
    dispatch(setPost(res));
    dispatch(setIsLoadingPost(false));
  });
};

export const addPost = (data) => (dispatch) => {
  dispatch(setIsLoadingNewPost(true));
  return newPost(data).then((res) => {
    dispatch(setNewPostResponse(res));
    dispatch(setIsLoadingNewPost(false));
    return res;
  });
};

export const editPost = (id, data) => (dispatch) => {
  dispatch(setIsLoadingNewPost(true));
  return editPostAPI(id, data).then((res) => {
    dispatch(setEditPostResponse(res));
    dispatch(setIsLoadingNewPost(false));
    console.log(res);
    return res;
  });
};

export const setNullEditPost = () => (dispatch) => {
  dispatch(setPost(null));
};

export const deletePost = (id) => () => {
  return deletePostAPI(id).then((res) => res);
};

export default postReducer.reducer;
