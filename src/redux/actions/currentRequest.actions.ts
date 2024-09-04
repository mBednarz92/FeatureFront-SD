import IFeatureRequest from "../../interfaces/IFeatureRequest";
import {
  resetCURRENTREQUEST,
  setCURRENTREQUEST,
} from "../constants/currentRequest.types";

export const setCurrentRequest = (
  featureRequestObject: IFeatureRequest
): { type: string; payload: IFeatureRequest } => {
  return {
    type: setCURRENTREQUEST,
    payload: featureRequestObject,
  };
};

export const resetCurrentRequest = (
  featureRequestObject: IFeatureRequest
): { type: string; payload: IFeatureRequest } => {
  return {
    type: resetCURRENTREQUEST,
    payload: featureRequestObject,
  };
};
