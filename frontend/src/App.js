import React, { useEffect } from 'react';
import Route from './Routes';
import './assets/scss/themes.scss';
//i18n
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";

function App() {
  return (
    <I18nextProvider i18n={i18n}>

      <React.Fragment>
        <Route />
      </React.Fragment>
    </I18nextProvider>

  );
}

export default App;
