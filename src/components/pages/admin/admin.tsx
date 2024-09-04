import { Person } from "@microsoft/mgt-react";
import * as React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { setRequester } from "../../../redux/actions/requester.actions";
import {
  setDescription,
  setMain,
} from "../../../redux/actions/requestStage.actions";
import { Requester } from "../../interfaces/requester";
import NextBackButtons from "../../molecules/nextBackButtons/nextBackButtons";

import styles from "./admin.module.scss";
import { Providers } from "@microsoft/mgt-element";
import CurrentRequestTabele from "../../molecules/currentRequestTabele/currentRequestTabele";

function Admin(props: any) {
  let date = new Date(Date.now());

  return (
    <>
      <div className={styles.main__header__container}>
        <h2>Admin Dashboard</h2>
      </div>
      <div className={styles.main__content__container}>
        <CurrentRequestTabele />
      </div>
      <NextBackButtons
        back={() => {
          props.setMain();
        }}
      />
    </>
  );
}

const mapStateToProps: any = (state: any) => {
  return {
    requestStage: state.requestStage,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setMain: () => dispatch(setMain()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
