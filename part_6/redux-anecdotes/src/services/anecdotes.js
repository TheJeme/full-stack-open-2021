import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const createNewAnecdote = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const getAllAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const voteAnecdote = async (anecdote) => {
  const response = await axios.patch(`${baseUrl}/${anecdote.id}`, anecdote);
  return response.data;
};

export default {
  createNewAnecdote,
  getAllAnecdotes,
  voteAnecdote,
};
