import { createSelector } from "@ngrx/store";

import { IAppState } from "../state/app.state";
import { CandidateState } from "../state/candidates.state";

const selectCandidates = (state: IAppState) => state.candidates;

export const selectUserList = createSelector(
  selectCandidates,
  (state: CandidateState) => state
);
