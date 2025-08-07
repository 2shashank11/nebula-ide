import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLoggedIn, setLoggedOut } from "../features/user/authSlice";
import { getUserProfile } from "@/api/user";

const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const syncAuth = async () => {
      try {
        const response = await getUserProfile();
        dispatch(setLoggedIn(response.data.user));
      } catch {
        dispatch(setLoggedOut());
      }
    };

    syncAuth();
  }, []);

  return null;
};

export default AuthInitializer;
