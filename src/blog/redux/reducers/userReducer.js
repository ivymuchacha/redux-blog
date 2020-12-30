import { createSlice } from "@reduxjs/toolkit";
import { login, getMe, register as registerAPI } from "../../WebAPI";
import { setAuthToken } from "../../utils";

export const userReducer = createSlice({
  name: "users",
  initialState: {
    user: null,

    errorMessage: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setUser, setErrorMessage } = userReducer.actions;

export const setNullErrorMessage = () => (dispatch) => {
  dispatch(setErrorMessage(null));
};

export const getUser = (username, password) => (dispatch) => {
  login(username, password).then((res) => {
    if (res.ok === 0) {
      dispatch(setErrorMessage(res.message));
      return;
    }
    setAuthToken(res.token);

    getMe().then((response) => {
      if (response.ok !== 1) {
        dispatch(setErrorMessage(response.toString()));
        setAuthToken(null);
        return;
      }
      dispatch(setUser(response.data));
    });
  });
};

export const getMeUser = () => (dispatch) => {
  getMe().then((response) => {
    if (response.ok) {
      dispatch(setUser(response.data));
    }
  });
};

export const logOut = () => (dispatch) => {
  dispatch(setUser(null));
};

export const register = (nickname, username, password) => (dispatch) => {
  setErrorMessage(null);
  registerAPI(nickname, username, password).then((data) => {
    if (data.ok !== 1) {
      dispatch(setErrorMessage(data.message));
      return;
    }
    setAuthToken(data.token);

    getMe().then((response) => {
      if (response.ok !== 1) {
        dispatch(setErrorMessage(response.toString()));
        setAuthToken(null);
        return;
      }
      dispatch(setUser(response.data));
    });
  });
};

export default userReducer.reducer;
