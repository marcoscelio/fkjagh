import axios from "axios";

const apiUrl = import.meta.env.VITE_TN_API;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error)
    return Promise.reject("Erro de conexão, por favor tente novamente.");
  }
);

export const httpPostFormData = async (
  path: string,
  formData: FormData,
  headers: object,
  token?: string
) => {
  return axios.post(
    `${apiUrl}/${path}`,
    formData,
    {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const httpPost = async (
  path: string,
  data: any,
  headers: object,
  token?: string
) => {
  return axios.post(
    `${apiUrl}/${path}`,
    {
      ...data,
    },
    {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const httpPatch = async (
  path: string,
  data: any,
  headers: object,
  token?: string
) => {
  return axios.patch(
    `${apiUrl}/${path}`,
    {
      ...data,
    },
    {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const httpDelete = async (
  path: string,
  headers: object,
  token?: string
) => {
  return axios.delete(`${apiUrl}/${path}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const httpGet = async (
  path: string,
  headers: object,
  token?: string
) => {
  return axios.get(`${apiUrl}/${path}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });
};
