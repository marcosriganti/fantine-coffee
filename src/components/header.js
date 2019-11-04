import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

//Icons
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../assets/logo.png';
import AppBar from '@material-ui/core/AppBar';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  menu: {
    backgroundColor: '#212121',
  },
  navLink2: {
    textDecoration: 'none',
    fontFamily: 'Karla, Arial, Helvetica, sans-serif',
    fontWeight: 700,
    fontSize: '15px',
    color: '#212121',
  },
  navLink: {
    color: 'rgba(255,255,255,0.6)',
    textDecoration: 'none',
    fontFamily: 'Karla, Arial, Helvetica, sans-serif',
    fontWeight: 700,
    fontSize: '15px',
    'transition-property': 'color,background-color,border-color',
    'transition-duration': '.2s',
    'transition-timing-function': 'linear',
    '&:hover': {
      color: '#ffffff',
    },
  },
});

const Header = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar style={{ backgroundColor: '#212121' }} position={'fixed'}>
      <Container maxWidth="lg">
        <Box display="flex" flexDirection="row">
          <Box py={1}>
            {' '}
            <Link to="/">
              <img src={Logo} alt="Fantine" />
            </Link>
          </Box>
          <Box display="flex" justifyContent="flex-end" alignContent="flex-end" flex="1">
            {/* <Hidden smUp> */}
            <Hidden mdUp>
              <Box display="flex" flexDirection="row" pt={3}>
                <Box m={1} mx={2}>
                  <FontAwesomeIcon icon={faBars} onClick={handleClick} />
                </Box>
              </Box>
            </Hidden>
            <Hidden smDown>
              <Box display="flex" flexDirection="row" pt={3}>
                <Box m={1} mx={2}>
                  <a href="http://www.fantine.io/" className={classes.navLink}>
                    About
                  </a>
                </Box>
                <Box m={1} mx={2}>
                  <a href="http://www.fantine.io/the-problem/" className={classes.navLink}>
                    The Problem
                  </a>
                </Box>
                <Box m={1} mx={2}>
                  <a href="http://www.fantine.io/mission/" className={classes.navLink}>
                    Mission
                  </a>
                </Box>
                <Box m={1} mx={2}>
                  <a href="http://www.fantine.io/news/" className={classes.navLink}>
                    News
                  </a>
                </Box>
                <Box m={1} mx={2}>
                  <a href="http://www.fantine.io/contact/" className={classes.navLink}>
                    Contact
                  </a>
                </Box>
              </Box>
            </Hidden>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              classes={classes.menu}
            >
              <MenuItem onClick={handleClose}>
                <a href="http://www.fantine.io/" className={classes.navLink2}>
                  About
                </a>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <a href="http://www.fantine.io/the-problem/" className={classes.navLink2}>
                  The Problem
                </a>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <a href="http://www.fantine.io/news/" className={classes.navLink2}>
                  News
                </a>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <a href="http://www.fantine.io/contact/" className={classes.navLink2}>
                  Contact
                </a>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};
export default Header;
