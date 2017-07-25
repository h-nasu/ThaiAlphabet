
export const GET_QUESTION = 'GET_QUESTION';

export function getQuestion(used) {
  return {
    type: GET_QUESTION,
    used: used,
  };
}
