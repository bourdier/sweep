import { setAuth } from "./reducer";

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/user/login", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    dispatch(
      setAuth({
        email: email,
        isLoggedIn: true,
        token: data.body["token"],
      })
    );

    console.log(data)
  } catch (error) {
    console.log(error);
  }
};

export const signup = (username, email, password) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/user/signup", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    dispatch(
      setAuth({
        email: email,
        isLoggedIn: true,
        token: data.body["token"],
      })
    );
    
    console.log(data)
  } catch (error) {
    console.log(error);
  }
}