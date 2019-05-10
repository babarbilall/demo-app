import { RouterReducerState } from "@ngrx/router-store";

import { CandidateState, initialCandidatesState } from "./candidates.state";

export interface IAppState {
  router?: RouterReducerState;
  candidates: CandidateState
}

export const initialAppState: IAppState = {
  candidates: initialCandidatesState
}

export function getInitialState() {
  return initialAppState;
}
