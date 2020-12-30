import { useEffect, useRef } from "react";

const TOKEN_NAME = "token";

export const MEDIA_QUERY = "@media screen and (max-width: 768px)";

export const setAuthToken = (token) => localStorage.setItem(TOKEN_NAME, token);

export const getAuthToken = () => localStorage.getItem(TOKEN_NAME);

export function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
