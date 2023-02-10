import { getData, postData } from "./apiConfig";

export const getAllUsers = () => {
  return getData(
    `https://my-json-server.typicode.com/tsevdos/epignosis-users/users`
  );
};

export const getUser = (id) => {
  return getData(
    `https://my-json-server.typicode.com/tsevdos/epignosis-users/users/${id}`
  );
};

export const updateUser = (id, payload) => {
  return postData(
    `https://my-json-server.typicode.com/tsevdos/epignosis-users/users/${id}`,
    payload
  );
};
