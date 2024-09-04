import { combineReducers } from "redux";
import CurrentRequestReducer from "./currentRequest.reducer";
import FeatureRequestReducer from "./featureRequest.reducer";
import RequesterReducer from "./requester.reducer";

import RequestStageReducer from "./requestStage.reducer";
import RequestStatusReducer from "./requestStatus.reducer";
//Reducers

const rootReducer = combineReducers({
  requestStage: RequestStageReducer,
  requester: RequesterReducer,
  featureRequest: FeatureRequestReducer,
  currentRequest: CurrentRequestReducer,
  requestStatus: RequestStatusReducer,
});

export default rootReducer;
