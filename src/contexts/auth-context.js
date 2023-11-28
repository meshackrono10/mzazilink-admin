import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem("authenticated") === "true";
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = {
        id: "5e86809283e28b96d2d38537",
        avatar: "/assets/avatars/avatar-anika-visser.png",
        name: "Anika Visser",
        email: "anika.visser@devias.io",
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem("authenticated", "true");
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: "5e86809283e28b96d2d38537",
      avatar: "/assets/avatars/avatar-anika-visser.png",
      name: "Anika Visser",
      email: "anika.visser@devias.io",
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user,
    });
  };

  // const signIn = async (email, password) => {
  //   if (email !== "demo@devias.io" || password !== "Password123!") {
  //     throw new Error("Please check your email and password");
  //   }

  //   try {
  //     window.sessionStorage.setItem("authenticated", "true");
  //   } catch (err) {
  //     console.error(err);
  //   }

  //   const user = {
  //     id: "5e86809283e28b96d2d38537",
  //     avatar: "/assets/avatars/avatar-anika-visser.png",
  //     name: "Anika Visser",
  //     email: "anika.visser@devias.io",
  //   };

  //   dispatch({
  //     type: HANDLERS.SIGN_IN,
  //     payload: user,
  //   });
  // };

  const signIn = async (email, password) => {
    try {
      // Log the URL for debugging purposes

      const response = await axios.post(
        "http://159.203.141.75:81/api/v2/school/user/login/",
        {
          device_name: "Dell",
          device_model: "LT 2500",
          device_product: "256998",
          device_os_api_level: "Windows 10",
          device_manufacturer: "DELL",
          device_screen_height: "1280",
          device_screen_width: "800",
          device_sd_card_state: "False",
        },
        {
          headers: {
            preflightContinue: false,
            "x-api-key": "random token",
          },
        }
      );

      // Handle response
      console.log("Response:", response.data);

      if (!response.data.success) {
        // Handle authentication failure with error message from the backend
        const errorMessage = response.data.message || "Authentication failed";
        throw new Error(errorMessage);
      }

      // Update session storage to mark the user as authenticated
      window.sessionStorage.setItem("authenticated", "true");

      // Dispatch the SIGN_IN action with user data
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: response.data,
      });
    } catch (err) {
      // Handle any errors during the login process
      console.error(err);
      throw new Error(err.message || "Authentication failed");
    }
  };

  const signUp = async (email, name, password) => {
    throw new Error("Sign up is not implemented");
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
