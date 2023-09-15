export const GET_DETAIL = "GET_DETAIL";
export const GET_ALL = "GET_ALL";
import axios from "axios";

export const getAll = () => {
  return async function (dispatch) {
    let aux = await axios.get("http://localhost:3001/drivers");
    return dispatch({ type: GET_ALL, payload: aux.data });
  };
};

export const getDetail = (id) => {
  return async function (dispatch) {
    let aux = await axios.get(`http://localhost:3001/drivers/${id}`);
    return dispatch({ type: GET_DETAIL, payload: aux.data });
  };
};
