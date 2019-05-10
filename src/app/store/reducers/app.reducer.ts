import { ActionReducerMap } from "@ngrx/store";
import { routerReducer } from "@ngrx/router-store";
import { candidateReducer } from "./candidate.reducer";

export const appReducer = {
  router: routerReducer,
  candidates: candidateReducer
};
