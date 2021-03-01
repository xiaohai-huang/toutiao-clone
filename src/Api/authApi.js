let authApi = {};
const BASE_URL = "https://toutiao-proxy.herokuapp.com/tt";
// const BASE_URL = "http://localhost:4500/tt";

authApi.login = (email, password) => {
  return fetch(`${BASE_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

authApi.register = (email, password) => {
  return fetch(`${BASE_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export default authApi;
