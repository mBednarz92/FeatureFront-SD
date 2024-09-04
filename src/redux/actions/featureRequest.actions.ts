import IFeatureRequest from "../../interfaces/IFeatureRequest";

import {
  resetFEATUREREQUEST,
  setFEATUREREQUEST,
} from "../constants/featureRequest.types";

export const resetFeatureRequest = () => {
  return {
    type: resetFEATUREREQUEST,
  };
};

export const setFeatureRequest = (
  featureRequestObject: IFeatureRequest
): { type: string; payload: IFeatureRequest } => {
  return {
    type: setFEATUREREQUEST,
    payload: featureRequestObject,
  };
};
