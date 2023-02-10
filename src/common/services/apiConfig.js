import axios from "axios";

export const getData = async (api) => {
  try {
    const resp = await axios.get(api);
    if (resp.status !== 200)
      throw {
        code: resp.status,
        type: "NETWORK",
        description: resp.statusText,
      };
    return resp;
  } catch (error) {
    return error;
  }
};

export const postData = async (api, data) => {
  return axios
    .put(api, data)
    .then((resp) => {
      if (resp.status !== 200)
        throw {
          code: resp.status,
          type: "NETWORK",
          description: resp.statusText,
        };
      return resp;
    })
    .catch((error) => {
      return error;
    });
};
