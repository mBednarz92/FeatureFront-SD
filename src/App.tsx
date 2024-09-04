import FeatureRequest from "./components/pages/index";
import styles from "./App.module.scss";

import { Login } from "@microsoft/mgt-react";
import { Providers, ProviderState } from "@microsoft/mgt-element";

import SkidataLogo from "./assets/skidata-logo.png";

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setAdmin } from "./redux/actions/requestStage.actions";

function App(props: any) {
  const [isSignedIn, setIsSignedIn] = useState<Boolean>(false);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const updateState = () => {
      const provider = Providers.globalProvider;
      setIsSignedIn(provider && provider.state === ProviderState.SignedIn);
    };

    Providers.onProviderUpdated(updateState);
    updateState();

    return () => {
      Providers.removeProviderUpdatedListener(updateState);
    };
  }, []);

  useEffect(() => {
    Providers.globalProvider.graph.client
      .api("me")
      .get()
      .then((gotMe) => {
        setUserName(gotMe.displayName);
        console.log(gotMe);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  var adminList = ["Marcin Bednarz - SKIDATA", "Benjamin Rowley - SKIDATA"];

  return (
    <div className={styles.app}>
      <header>
        {adminList.includes(userName) && (
          <p className={styles.adminButton} onClick={() => props.setAdmin()}>
            ADMIN
          </p>
        )}

        <Login />
      </header>

      {isSignedIn ? (
        <FeatureRequest />
      ) : (
        <div className={styles.welcome__container}>
          <div className={styles.welcome__box}>
            <div className={styles.logo__container}>
              <img
                alt="skidata_logo"
                src={SkidataLogo}
                className={styles.welcomeImage}
              />
              <h1 className={styles.logo__container__title}>Feature Request</h1>
            </div>
            <div className={styles.loginWrapper}>
              <Login />
            </div>
            <p>Please sign in with Skidata MS account to continue.</p>
          </div>
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setAdmin: () => dispatch(setAdmin()),
  };
};

export default connect(null, mapDispatchToProps)(App);
