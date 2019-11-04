import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

//Router
import { Link } from 'react-router-dom';

//Layout
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

//Styles
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Avatar from '@material-ui/core/Avatar';

import placeholderUser from '../assets/placeholder_user.png';

//Icons
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProductItem from '../components/productItem';
//DB
import { useDocument, useCollection } from '../helper/firestore';
import { firestore } from '../firebase';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    '& > .fa': {
      margin: theme.spacing(2),
    },
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
  bigAvatar: {
    margin: 10,
    width: 300,
    height: 300,
  },
  sideSquare: {
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.main,
    backgroundPosition: 'center',
  },

  square: {
    height: '325px',
    backgroundColor: theme.palette.primary.main,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  noImage: {
    backgroundColor: '#7C7C7C',
    backgroundRepeat: 'no-repeat',
  },
  productInfo: {
    backgroundColor: 'rgba(0,0,0,.4)',
    borderRadius: 10,
  },
  product: {
    '& a': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
    },
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
}));

const Loading = () => (
  <Box py={3} style={{ minHeight: '85vh' }}>
    <Container maxWidth="lg">
      <Box p={10}>Loading...</Box>
    </Container>
  </Box>
);
const ProfileWrapper = ({ props, match }) => {
  const userId = match.params.userId;
  const [farm, loading] = useDocument(() => firestore.collection('users').doc(userId));
  if (loading) {
    return <Loading />;
  }
  console.log('Farm', farm);
  // if (farm.associates != undefined && associates.length > 0) {
  //   //Here
  // }
  //Get Associated

  // if()
  return <Profile userId={userId} farm={farm} />;
};
const Profile = ({ userId, farm }) => {
  const [products, loadingProducts] = useCollection(() =>
    firestore.collection('products').where('user_id', '==', userId)
  );

  const [associates, loadingAsoc] = useCollection(() =>
    firestore.collection('associates').where('user_id', '==', userId)
  );

  useEffect(() => {
    document.title = 'Fantine - ' + farm.company + (farm.cooperative ? ' Cooperative ' : ' Farm ');
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; //
  }, []);

  const classes = useStyles();

  return (
    <Box py={3} style={{ minHeight: '80vh' }} mb={5}>
      <Container maxWidth="lg">
        <Box my={2}>
          <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
            <Link color="primary" to="/" className={classes.link}>
              Our Coffee
            </Link>
            <Link color="primary" className={classes.link} to={`/profile/${farm.id}`}>
              {farm.company}
            </Link>
          </Breadcrumbs>
        </Box>
        <Box my={3}>
          <Grid container>
            <Grid item md={4}>
              <Avatar
                alt={farm.company}
                src={farm.image ? farm.image : placeholderUser}
                style={{
                  width: 300,
                  height: 300,
                }}
              />
            </Grid>
            <Grid item md={8}>
              <Box my={3}>
                <Typography variant="h3" component="h3" color="primary">
                  {farm.firstName ? (
                    <span>
                      {farm.firstName} {farm.lastName} -
                    </span>
                  ) : null}{' '}
                  {farm.company}
                </Typography>
                <Box my={2}>
                  <Typography variant="body1" component="p">
                    {farm.description}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5" component="h4" color="primary">
                    Location
                  </Typography>
                  <Typography variant="h6" component="p">
                    <FontAwesomeIcon icon={faGlobeAmericas} /> {farm.state}, {farm.country}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {!loadingAsoc && associates.length ? (
          <div>
            <Box my={3}>
              <Typography variant="h4" component="h3" color={'#000'} align="center">
                Farmers
              </Typography>
            </Box>
            <Box my={3}>
              <Divider />
            </Box>
            <Grid container spacing={2}>
              {associates.map(user => {
                return (
                  <Grid item xs={12} md={4} key={user.id}>
                    <Grid container>
                      <Grid item md={4}>
                        <Avatar
                          alt={``}
                          src={user.image ? user.image : placeholderUser}
                          style={{
                            width: '100%',
                            maxWidth: '110px',
                            height: '100%',
                            maxHeight: '110px',
                          }}
                        />
                      </Grid>
                      <Grid item md={8}>
                        <Box my={3}>
                          <Typography variant="h6" component="h3" color="primary">
                            {user.firstName ? (
                              <span>
                                {user.firstName} {user.lastName}
                              </span>
                            ) : null}
                          </Typography>

                          {user.description ? (
                            <Typography variant="body1" component="p" color={'#000'}>
                              {user.description}
                            </Typography>
                          ) : null}
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        ) : null}

        {!loadingProducts && products.length ? (
          <div>
            <Box my={3}>
              <Typography variant="h4" component="h3" color={'#000'} align="center">
                {farm.company}'s Coffees
              </Typography>
            </Box>
            <Box my={3} mb={4}>
              <Divider />
            </Box>
            <Grid container spacing={2}>
              {products.map(product => {
                return (
                  <Grid item xs={12} md={4} key={product.id} className={classes.product}>
                    <ProductItem product={product} classes={classes} company={farm.company}></ProductItem>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        ) : null}
      </Container>
    </Box>
  );
};
export default ProfileWrapper;
