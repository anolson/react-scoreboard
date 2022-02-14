// import { createStore } from 'redux'

const initialState = {
  players: [
    { name: "Andrew Olson", score: 42 },
    { name: "Jim Hoskins", score: 33 }
  ],
};

const playersReducer = (state = initialState, action) => {
  // Reducers usually look at the type of action that happened
  // to decide how to update the state
  switch (action.type) {
    case 'ADD_PLAYER':
      return {
        ...state,
        players: state.players.concat(action.payload),
      };
    case 'REMOVE_PLAYER':
      return {
        ...state,
        players: state.players.filter((player, index) => index !== action.payload)
      };
    case 'SCORE_CHANGED':
      return {
        ...state,
        players: state.players.map(
          (player, index) =>
            index === action.payload.index
              ? {...player, score: player.score += action.payload.delta}
              : player
        ),
      };
    default:
      return state
  }
}

export default playersReducer
