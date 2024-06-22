import { useAppDispatch, useAppSelector } from "store/hooks";
import { LoginReq, RegisterReq } from "../types";
import { UserState, selectUser, userActions } from "../store";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export type UserServiceOperators = {
  loginUser: (data: LoginReq) => void;
  registerUser: (data: RegisterReq) => void;
  getCurrentUser: () => void;
  logoutUser: () => void;
} & UserState;

export const onSuccess = (message: string) => {
  toast.success(message);
};
export const onError = (message: string) => {
  toast.error(message);
};

export const useUserService = (): Readonly<UserServiceOperators> => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    redirectToLogin,
    redirectToRegister,
    redirectToProfile,
    ...userSlice
  } = useAppSelector(selectUser);

  useEffect(() => {
    if (redirectToLogin) {
      setTimeout(() => {
        dispatch(userActions.clearRedirection());
        navigate("/login");
      }, 3000);
    }
    if (redirectToRegister) {
      dispatch(userActions.clearRedirection());
      navigate("/");
    }

  }, [redirectToLogin, redirectToRegister, redirectToProfile]);

  return {
    ...userSlice,
    redirectToLogin,
    redirectToRegister,
    redirectToProfile,
    loginUser: useCallback(
      (data) => {
        dispatch(userActions.loginUser({ data, onSuccess, onError }));
      },
      [dispatch]
    ),
    registerUser: useCallback(
      (data) => {
        dispatch(userActions.registerUser({ data, onSuccess, onError }));
      },
      [dispatch]
    ),
    getCurrentUser: useCallback(() => {
      dispatch(userActions.getCurrentUser({ onSuccess, onError }));
    }, [dispatch]),
    logoutUser: useCallback(() => {
      dispatch(userActions.logoutUser());
    }, [dispatch]),
  };
};
