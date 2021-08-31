import { START_GAME, UPDATE_VARIABLES } from "../actions/games";

const initialState = {
  minimum: 0,
  maximum: 1000,
  gameStarted: false,
  solution: 0,
};

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VARIABLES:
      return {
        ...state,
        minimum: action.minimum,
        maximum: action.maximum,
        gameStarted: false,
        solution: 0,
      };
    case START_GAME:
      return {
        ...state,
        gameStarted: true,
        solution: random(state.minimum, state.maximum),
      };
    default:
      return state;
  }
};
