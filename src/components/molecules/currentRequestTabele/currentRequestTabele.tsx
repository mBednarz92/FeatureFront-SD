import { connect } from "react-redux";
import styles from "./currentRequestTabele.module.scss";

import axios from "axios";
import { useEffect, useState } from "react";
import IFeatureRequest from "../../../interfaces/IFeatureRequest";
import { stat } from "fs";
import { setRequestView } from "../../../redux/actions/requestStage.actions";
import { setCurrentRequest } from "../../../redux/actions/currentRequest.actions";

function CurrentRequestTabele(props: any) {
  const [currentUserName, setCurrentUserName] = useState(props.user);
  const [userRequests, setUserRequests] = useState<IFeatureRequest[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  var connections = 0;

  useEffect(() => {
    if (isLoading) {
      axios
        .get(
          "https://featurerequest20230327114557.azurewebsites.net/request/all"
        )
        .then((response) => {
          var currentRequestsArray: IFeatureRequest[] = [];
          var newRequest: IFeatureRequest;
          response.data.forEach((responseRequest: IFeatureRequest) => {
            newRequest = responseRequest;

            currentRequestsArray.push(newRequest);
          });

          setUserRequests(currentRequestsArray);
          if (currentRequestsArray.length > 0 || connections >= 3) {
            setIsLoading(false);
          } else {
            connections++;
          }

          console.log("Try: " + connections);
          console.log(response.data);
        });
    } else {
      console.log("isLoading = false");
    }
  }, []);

  useEffect(() => {
    setCurrentUserName(props.user);
  });

  return (
    <div className={styles.homeDescriptionSection}>
      <div className={styles.currentRequestHeader}>
        <h2>Current Requests</h2>
      </div>
      <div className={styles.currentRequest__table__header}>
        <div className={styles.currentRequest__table__idField}>
          <p>Id</p>
        </div>
        <div className={styles.currentRequest__table__nameField}>
          <p>Name</p>
        </div>
        <div className={styles.currentRequest__table__dateField}>
          <p>Creation Date</p>
        </div>
        <div>
          <p>SDUnit</p>
        </div>
        <div>
          <p>Requester</p>
        </div>
      </div>
      <div className={styles.rows__container}>
        {isLoading ? (
          <p>Loading</p>
        ) : userRequests.length == 0 ? (
          <p>No requests</p>
        ) : (
          userRequests.map((request: IFeatureRequest) => (
            <div
              className={styles.currentRequest__table__row}
              onClick={() => {
                props.setRequestView();
                props.setCurrentRequest(request);
              }}
            >
              <div className={styles.currentRequest__table__idField}>
                <p>{request.requestId}</p>
              </div>
              <div className={styles.currentRequest__table__nameField}>
                <p>{request.requestHeadline}</p>
              </div>
              <div className={styles.currentRequest__table__dateField}>
                <p>{request.requestDate?.toLocaleString("de")}</p>
              </div>
              <div>
                <p>{request.sdUnit}</p>
              </div>
              <div>
                <p>{request.requesterName}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setRequestView: () => dispatch(setRequestView()),
    setCurrentRequest: (currentRequest: IFeatureRequest) =>
      dispatch(setCurrentRequest(currentRequest)),
  };
};

export default connect(null, mapDispatchToProps)(CurrentRequestTabele);
