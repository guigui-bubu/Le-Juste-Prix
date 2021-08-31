export const UPDATE_VARIABLES = "UPDATE_VARIABLES";
export const START_GAME = "START_GAME";

export const updateVariables = (minimum, maximum) => {
  return {
    type: UPDATE_VARIABLES,
    minimum: minimum,
    maximum: maximum,
  };
};

export const startGame = () => {
  return {
    type: START_GAME,
  };
};
