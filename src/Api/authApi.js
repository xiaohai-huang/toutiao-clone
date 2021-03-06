let authApi = {};
const test = "http://localhost:4500/tt";
const production = "https://toutiao-proxy.herokuapp.com/tt";
const BASE_URL = process.env.NODE_ENV === "development" ? test : production;
authApi.login = (username, password) => {
  return fetch(`${BASE_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
};

authApi.register = (username, password, avatar_url) => {
  return fetch(`${BASE_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, avatar_url }),
  });
};

export default authApi;
