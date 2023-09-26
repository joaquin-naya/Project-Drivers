export const GET_DRIVERS_BY_NAME = "GET_DRIVERS_BY_NAME";
export const CREATE_DRIVER = "CREATE_DRIVER";
export const GET_DETAIL = "GET_DETAIL";
export const GET_TEAMS = "GET_TEAMS";
export const GET_ALL = "GET_ALL";
export const ORDER = "ORDER";
export const FILTER_TEAMS = "FILTER_TEAMS";
export const RESET = "RESET";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const SEARCH_DRIVERS = "SEARCH_DRIVERS";
export const SET_ERROR = "SET_ERROR";
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

export function getTeams() {
  return async function (dispatch) {
    try {
      const response = await axios("http://localhost:3001/teams");
      return dispatch({
        type: GET_TEAMS,
        payload: response.data,
      });
    } catch (error) {
      // Manejo de errores
    }
  };
}

export const createDriver = (payload) => {
  return async function (dispatch) {
    try {
      const service = await axios.post("http://localhost:3001/create", payload);
      dispatch({ type: CREATE_DRIVER, payload });
      if (service.status === 201) {
        dispatch(getAll());
        return alert("Created Succesfully!");
      }
    } catch (error) {
      if (error.response.status === 400) {
        return alert("Driver's name already exists");
      }
      if (error.response.status === 404) {
        return alert("Internal server error");
      }
    }
  };
};

export function getDriversByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios(
        `http://localhost:3001/drivers/?name=${name}`
      );
      return dispatch({
        type: GET_DRIVERS_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({});
    }
  };
}

export function orderDrivers(orderType) {
  return {
    type: ORDER,
    payload: orderType,
  };
}

export function filterTeams(team) {
  return {
    type: FILTER_TEAMS,
    payload: team,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}

export function filterOrigin(origin) {
  return {
    type: FILTER_ORIGIN,
    payload: origin,
  };
}

export function searchDrivers(name, isChecked) {
  return {
    type: SEARCH_DRIVERS,
    payload: { name, isChecked },
  };
}

export const setError = (errorMessage) => ({
  type: SET_ERROR,
  payload: errorMessage,
});
