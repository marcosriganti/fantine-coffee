import React from 'react';
import './App.css';
import Layout from './components/layout';
import List from './pages/List.js';
import ProductWrapped from './pages/Product.js';
import ProfileWrapper from './pages/Profile.js';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// get our fontawesome imports

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Karla, Arial, Helvetica',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': 'Karla',
      },
    },
  },
  palette: {
    primary: { main: '#308f9a' },
    secondary: { main: '#fff' }, // This is just green.A700 as hex.
  },
});

function App() {
  return (
    <Router basename={'/coffee'}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Switch>
            <Route path="/product/:code" component={ProductWrapped} />
            <Route path="/profile/:userId" component={ProfileWrapper} />
            <Route path="/" title={'Listing'}>
              <List />
            </Route>
          </Switch>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
