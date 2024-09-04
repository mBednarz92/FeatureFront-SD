import * as React from "react";
import { connect } from "react-redux";
import styles from "./index.module.scss";

import SkidataLogo from "../../assets/skidata-logo.png";
import Main from "./main/main";
import Description from "./description/description";
import Customer from "./customer/customer";
import Summary from "./summary/summary";
import Admin from "./admin/admin";
import RequestView from "./requestView/requestView";
import { useState } from "react";
import popOut from "../molecules/popOut/popOut";
import PopOut from "../molecules/popOut/popOut";

function FeatureRequest(props: any) {
  const [popOut, setPopOut] = useState<boolean>(false);

  return (
    <div className={styles.request__container}>
      {popOut && <PopOut setPopOut={setPopOut} />}
      <div className={styles.logo__container}>
        <img
          alt="skidata_logo"
          src={SkidataLogo}
          className={styles.welcomeImage}
        />
        <h1 className={styles.logo__container__title}>Feature Request</h1>
      </div>
      <div className={styles.request__content__container}>
        {props.requestStage === "main" && <Main />}
        {props.requestStage === "description" && <Description />}
        {props.requestStage === "customer" && <Customer />}
        {props.requestStage === "summary" && <Summary setPopOut={setPopOut} />}
        {props.requestStage === "admin" && <Admin />}
        {props.requestStage === "requestView" && <RequestView />}
      </div>
      <p className={styles.request__footer__text}>
        Developed by Skidata CCS team - v1.1.1
      </p>
    </div>
  );
}

const mapStateToProps: any = (state: any) => {
  return {
    requestStage: state.requestStage,
  };
};

export default connect(mapStateToProps)(FeatureRequest);
