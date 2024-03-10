import axios from "axios";
import { md5 } from "js-md5";
import { Action } from "./types";

const baseURL = "http://api.valantis.store:40000/";

const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
const customFormatDate = `${year}${month}${day}`;
const password = 'Valantis';

export const getIds = () => {
  return axios
    .post(
      baseURL,
      {
        action: Action.GET_IDS,
      },
      {
        headers: {
          "X-Auth": md5(`${password}_${customFormatDate}`),
        },
      }
    )
    .then((response) => response.data.result);
};

export const getData = <TParams>(action: Action, params: TParams) => {
  return axios
    .post(
      baseURL,
      {
        action: action,
        params: params,
      },
      {
        headers: {
          "X-Auth": md5(`${password}_${customFormatDate}`),
        },
      }
    )
    .then((response) => response.data.result);
};
