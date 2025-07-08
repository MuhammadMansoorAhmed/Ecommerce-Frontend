import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { getUserLoginStatus } from "../Redux/Services/authServices";

const useAdminAuth = (intervalMinutes = 5) => {
  const dispatch = useDispatch();
  const [authState, setAuthState] = useState({
    loading: true,
    isLoggedIn: false,
    role: null,
  });

  const intervalRef = useRef(null);

  const fetchAuthStatus = async () => {
    try {
      const response = await dispatch(getUserLoginStatus()).unwrap();
      setAuthState({
        loading: false,
        isLoggedIn: true,
        role: response.user.role,
      });
    } catch (err) {
      setAuthState({
        loading: false,
        isLoggedIn: false,
        role: null,
      });
    }
  };

  useEffect(() => {
    fetchAuthStatus();

    intervalRef.current = setInterval(() => {
      fetchAuthStatus();
    }, intervalMinutes * 60 * 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [dispatch, intervalMinutes]);

  return authState;
};

export default useAdminAuth;
