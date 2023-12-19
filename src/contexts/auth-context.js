import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";

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
      ...(user
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

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = localStorage.getItem("authenticated") === "true";
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

  useEffect(() => {
    initialize();
  }, []);

  const skip = () => {
    try {
      localStorage.setItem("authenticated", "true");
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

  const signIn = async (email, password) => {
    try {
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
            userId: "8989",
            securityCode: "ipj0DjOqyd7faka1aa9z1dA1mXESh1zfo5QV8PuuPnJwadTfal3ujesPspAgA2Nb",
            phoneNumber: "0728110017",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.success) {
        const errorMessage = response.data.message || "Authentication failed";
        throw new Error(errorMessage);
      }

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("authenticated", "true");

      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: response.data,
      });
    } catch (err) {
      console.error(err);
      throw new Error(err.message || "Authentication failed");
    }
  };

  const signOut = async () => {
    try {
      const storedToken = localStorage.getItem("token").toString();

      await axios.post(
        "http://159.203.141.75:81/api/v2/school/user/logout/",
        {},
        {
          headers: {
            token: storedToken,
          },
        }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("authenticated");

      dispatch({
        type: HANDLERS.SIGN_OUT,
      });
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    initialize();

    // Load isDarkMode state from local storage on component mount
    const savedIsDarkMode = localStorage.getItem("isDarkMode");
    if (savedIsDarkMode) {
      setIsDarkMode(JSON.parse(savedIsDarkMode));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signOut,
        isDarkMode,
        setIsDarkMode,
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
