let authApi = {};
const BASE_URL = "https://toutiao-proxy.herokuapp.com/tt";
// const BASE_URL = "http://localhost:4500/tt";

authApi.login = (username, password) => {
  return fetch(`${BASE_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
};

authApi.register = (username, password) => {
  return fetch(`${BASE_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
};

export default authApi;
