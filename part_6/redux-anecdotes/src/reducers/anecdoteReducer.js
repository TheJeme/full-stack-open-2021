import anecdoteService from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_ANECDOTES":
      return action.data;

    case "NEW_ANECDOTE":
      return [...state, action.data];

    case "VOTE_ANECDOTE": {
      return state.map((anecdote) =>
        anecdote.id === action.data
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    }
    default:
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAllAnecdotes();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNewAnecdote(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.voteAnecdote({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    const anecdoteId = anecdote.id;
    dispatch({
      type: "VOTE_ANECDOTE",
      data: anecdoteId,
    });
  };
};

export default anecdoteReducer;
