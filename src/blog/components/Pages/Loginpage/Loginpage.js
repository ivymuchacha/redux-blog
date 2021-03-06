import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  setNullErrorMessage,
} from "../../../redux/reducers/userReducer";
import { MEDIA_QUERY } from "../../../utils";

const Root = styled.div`
  margin: 0 auto;
  width: 80%;
  ${MEDIA_QUERY} {
    width: 95%;
  }
`;

const LoginForm = styled.form`
  background: #ef8354;
  margin: 10%;
  height: 280px;
  align-items: center;
  text-align: center;
  border: 1px solid #ef8354;
  padding-top: 40px;

  ${MEDIA_QUERY} {
    margin: 5% 0;
    height: 400px;
  }
`;
const Title = styled.h2`
  color: #ffffff;
  ${MEDIA_QUERY} {
    font-size: 24px;
    margin: 20px;
  }
`;
const InputContent = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: center;
  ${MEDIA_QUERY} {
    display: block;
  }
`;
const InputName = styled.div`
  font-size: 16px;
  color: #ffffff;
  ${MEDIA_QUERY} {
    font-size: 20px;
    margin: 10px;
  }
`;

const Input = styled.input`
  padding: 5px;
  width: 200px;
  border: none;
  ${MEDIA_QUERY} {
    padding: 10px;
    width: 80%;
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
  ${MEDIA_QUERY} {
    margin: 5px;
  }
`;

function LoginInput({ inputName, inputType, value, onChange }) {
  return (
    <div>
      <InputContent>
        <InputName>{inputName}</InputName>
        <Input type={inputType} onChange={onChange} value={value} />
      </InputContent>
    </div>
  );
}

LoginInput.propTypes = {
  inputName: PropTypes.string,
  inputType: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

function Loginpage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.users.user);
  const errorMessage = useSelector((store) => store.users.errorMessage);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getUser(username, password));
  };

  useEffect(() => {
    if (user) {
      history.push("/");
    }
    return () => {
      dispatch(setNullErrorMessage());
    };
  }, [user, history, dispatch]);

  return (
    <Root>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Login</Title>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <LoginInput
          inputName="Username："
          inputType="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <LoginInput
          inputName="Passwrod："
          inputType="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button>Submit</Button>
      </LoginForm>
    </Root>
  );
}

export default Loginpage;
