import {
  GET_ALL,
  GET_DETAIL,
  ORDER,
  GET_TEAMS,
  FILTER_TEAMS,
  RESET,
  FILTER_ORIGIN,
  SEARCH_DRIVERS,
  SET_ERROR,
  GET_DRIVERS_BY_NAME,
} from "./actions";

let initialState = {
  allDrivers: [],
  filteredDrivers: [],
  teams: [],
  error: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        allDrivers: action.payload,
        filteredDrivers: action.payload,
      };

    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        filteredDrivers: action.payload,
      };

    case GET_DRIVERS_BY_NAME:
      return {
        ...state,
        allDrivers: action.payload,
      };

    case SET_ERROR: //actualiza errores
      return {
        ...state,
        error: action.payload,
      };

    case ORDER:
      const orderType = action.payload;
      let sortedDrivers = [...state.filteredDrivers];
      if (orderType === "asc") {
        sortedDrivers.sort((a, b) => a.forename.localeCompare(b.forename));
      } else if (orderType === "desc") {
        sortedDrivers.sort((a, b) => b.forename.localeCompare(a.forename));
      } else if (orderType === "nacA") {
        sortedDrivers.sort((a, b) => {
          const dateA = new Date(a.dob);
          const dateB = new Date(b.dob);
          return dateA - dateB;
        });
      } else if (orderType === "nacD") {
        sortedDrivers.sort((a, b) => {
          const dateA = new Date(a.dob);
          const dateB = new Date(b.dob);
          return dateB - dateA;
        });
      }
      return {
        ...state,
        filteredDrivers: sortedDrivers,
      };

    case FILTER_TEAMS:
      const team = action.payload;
      const filteredTeam = state.filteredDrivers.filter((t) => {
        const teamsArray =
          t.teams && t.teams.split(",").map((team) => team.trim()); //comprueba que cada piloto tiene el equipo seleccionado en su team matriz
        return teamsArray && teamsArray.includes(team); //pilotos filtrados
      });

      if (!filteredTeam || filteredTeam.length === 0) {
        throw new Error("Not drivers with this team, please press RESET");
      }

      return {
        ...state,
        filteredDrivers: filteredTeam,
      };

    case FILTER_ORIGIN:
      const origin = action.payload;
      let filterByOrigin = [...state.filteredDrivers];

      if (origin === "api") {
        filterByOrigin = state.filteredDrivers.filter(
          (driver) => !("createdInDb" in driver)
        );
      } else if (origin === "db") {
        filterByOrigin = state.filteredDrivers.filter(
          (driver) => "createdInDb" in driver
        );
      }

      if (!filterByOrigin || filterByOrigin.length === 0) {
        throw new Error("No drivers with this filter");
      }

      return {
        ...state,
        filteredDrivers: filterByOrigin,
      };

    case SEARCH_DRIVERS:
      const isChecked = action.payload.isChecked;
      const name = action.payload.name;

      let searchResult = [];
      if (isChecked === "all") {
        //determinamos si la busqueda se realiza en todos los controladores (isChecked = todos)
        searchResult = state.allDrivers.filter((driver) => {
          return driver.forename.toLowerCase().startsWith(name.toLowerCase());
        });
      } else {
        //o solo en los controladores filtrados
        searchResult = state.filteredDrivers.filter((driver) => {
          return driver.forename.toLowerCase().startsWith(name.toLowerCase());
        });
      }

      if (searchResult.length === 0) {
        return {
          ...state,
          filteredDrivers: [],
          error: "No se encontraron resultados para la búsqueda.",
        };
      }

      return {
        ...state,
        filteredDrivers: searchResult,
      };

    case RESET: //restablece la matriz fDrivers copiando todos los controladores en allDri
      return {
        ...state,
        filteredDrivers: [...state.allDrivers],
      };

    default:
      return {
        ...state,
      };
  }
};
