import React, { useMemo, useContext, useState } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import HomePage from './page/HomePage'

import UploadPage from './page/UploadPage'
import NotFoundPage from './page/NotFoundPage'
import Footer from './common/Footer'
import NavBar from './common/NavBar'
import { createMuiTheme, MuiThemeProvider, responsiveFontSizes } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { themeContext } from './context/ThemeContext'
import { reactLocalStorage } from 'reactjs-localstorage';

function App() {

  var darkModeSetting = reactLocalStorage.getObject('darkMode');
  const themeManager = useContext(themeContext)
  themeManager.darkTheme = darkModeSetting ? darkModeSetting.isDark : false
  const [dark, setDark] = useState(themeManager.darkTheme)

  const updateTheme = (isDark) => {
    themeManager.darkTheme = isDark
    reactLocalStorage.setObject('darkMode', { isDark: themeManager.darkTheme });
    setDark(themeManager.darkTheme)
  }

  var processrTheme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          // support only light mode for now, to reduce testing effort 
          // type: prefersDarkMode ? 'dark' : 'light',
          type:  dark ? 'dark' : 'light',
          primary: {
            main: dark ? '#95f74f' : '#00A9FF'
          }
        }
      }),
    [dark]
  );
  processrTheme = responsiveFontSizes(processrTheme);
  return (
    <MuiThemeProvider theme={processrTheme}>
      <themeContext.Provider value={{darkTheme: themeManager.darkTheme, updateDarkTheme: updateTheme}}>
      <CssBaseline />
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/upload" component={UploadPage} />
            <Route exact path="/404" component={NotFoundPage}/>
            <Route component={NotFoundPage} />
          </Switch>
          <Footer />
        </div>
      </Router>
      </themeContext.Provider>
    </MuiThemeProvider>
  )
}

export default App
