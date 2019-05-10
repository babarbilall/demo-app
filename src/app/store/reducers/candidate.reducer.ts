import { CANDIDATE } from "../actions/candidate.actions";
import { initialCandidatesState } from "../state/candidates.state";

const addCandidate = (state, data) => {
  state.records.push(data);
  return state;
}

const initCandidates = (state, data) => {
  state = data;
  return state;
}

const removeCandidate = (state, data) => {
  let candidates = state.records;
  return state;
}

export const candidateReducer = (state = initialCandidatesState, action: any) => {
  switch (action.type) {
    case CANDIDATE.INIT:
    return initCandidates(state, action.payload);

    case CANDIDATE.ADD:
    return addCandidate(state, action.payload);

    case CANDIDATE.REMOVE:
    return removeCandidate(state, action.payload);

    default:
    return state;
  }
}
