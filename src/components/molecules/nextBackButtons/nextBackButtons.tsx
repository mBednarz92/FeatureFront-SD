import * as React from "react";
import { connect } from "react-redux";
import styles from "./nextBackButton.module.scss";

function NextBackButtons(props: any) {
  return (
    <div className={styles.requestButtonsContainer}>
      {props.requestStage !== "main" && (
        <button className={styles.requestBackButton} onClick={props.back}>
          BACK
        </button>
      )}
      {props.requestStage !== "admin" &&
        props.requestStage !== "requestView" && (
          <button className={styles.requestNextButton} onClick={props.next}>
            {props.requestStage === "summary" ? "SEND" : "NEXT"}
          </button>
        )}
    </div>
  );
}

const mapStateToProps: any = (state: any) => {
  return {
    requestStage: state.requestStage,
  };
};

export default connect(mapStateToProps, null)(NextBackButtons);
