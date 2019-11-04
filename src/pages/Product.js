import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Bags from '../assets/coffee-bag.png';
import Button from '@material-ui/core/Button';

import Divider from '@material-ui/core/Divider';

import Chip from '@material-ui/core/Chip';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
//Icons
import {
  faMountain,
  faLeaf,
  faGlobeAmericas,
  faWarehouse,
  faSeedling,
  faAward,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Router
import { Link } from 'react-router-dom';

//DB
import { useDocument, useCollection } from '../helper/firestore';
import { firestore } from '../firebase';

//Styles
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import placeholder1 from '../assets/placeholder_1.jpg';
import placeholder2 from '../assets/placeholder_2.jpg';
import placeholder3 from '../assets/placeholder_3.jpg';
import placeholderUser from '../assets/placeholder_user.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    '& > .fa': {
      margin: theme.spacing(2),
    },
  },
  sideSquare: {
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.main,
    backgroundPosition: 'center',
  },

  square: {
    height: '450px',
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
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
}));
const Loading = () => (
  <Box py={3} style={{ minHeight: '85vh' }}>
    <Container maxWidth="lg">
      <Box p={10}>Loading...</Box>
    </Container>
  </Box>
);
const ProductWrapped = ({ props, match }) => {
  const code = match.params.code;
  let product;
  const [products, loading] = useCollection(() => firestore.collection('products').where('name', '==', code));

  if (!loading) {
    product = products[0];
    if (product) {
      return <Product {...props} product={product} product_name={code} />;
    } else {
      return <Loading />;
    }
    // return <Product {...props} product={product} />;
  } else {
    return <Loading />;
  }
};
const Product = props => {
  const classes = useStyles();
  const { product, product_name } = props;
  const [farm, loading] = useDocument(() => firestore.collection('users').doc(product.user_id));
  
  useEffect(() => {
    document.title = 'Fantine - Coffee ' + product_name;
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; //
  }, []);

  if (!loading) {
    return (
      <Box py={3} style={{ minHeight: '85vh' }}>
        {/* Title  */}

        <Box py={3} mb={10}>
          <Container maxWidth="lg">
            <Box my={2}>
              <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                <Link color="primary" to="/" className={classes.link}>
                  Our Coffee
                </Link>
                <Link color="primary" className={classes.link} to={`/profile/${farm.id}`}>
                  {farm.company}
                </Link>

                <Link color="primary" to="/" className={classes.link}>
                  Coffee {product.name}
                </Link>
              </Breadcrumbs>
            </Box>
            <Box px={3}>
              <Typography variant="h4" component="h3">
                Coffee {product.name}
              </Typography>
            </Box>
            <Box my={3}>
              <Grid container spacing={0}>
                <Grid item xs={12} md={8}>
                  <Box px={3}>
                    <Grid item xs={12} md={12} key={product.id} className={classes.product}>
                      <Box boxShadow={2}>
                        <Box flex={5} display="flex" style={{ border: '2px solid #000' }}>
                          <Box
                            flex={3}
                            display="flex"
                            justifyContent="flex-end"
                            flexDirection="column"
                            className={[classes.square, product.images ? null : classes.noImage]}
                            style={{
                              borderRight: '2px solid #000',
                              backgroundImage: product.images ? `url(${product.images[1]})` : `url(${placeholderUser})`,
                            }}
                          ></Box>
                          <Box flex={2} flexDirection={'column'} display={'flex'}>
                            <Box
                              flex={1}
                              alignSelf={'stretch'}
                              className={[classes.sideSquare, product.images ? null : classes.noImage]}
                              style={{
                                backgroundImage: product.images ? `url(${product.images[0]})` : `url(${placeholder1})`,
                              }}
                            ></Box>
                            <Box
                              flex={1}
                              alignSelf={'stretch'}
                              className={[classes.sideSquare, product.images ? null : classes.noImage]}
                              style={{
                                borderTop: '2px solid #000',
                                borderBottom: '2px solid #000',
                                backgroundImage: product.images ? `url(${product.images[2]})` : `url(${placeholder2})`,
                              }}
                            ></Box>
                            <Box
                              flex={1}
                              alignSelf={'stretch'}
                              className={[classes.sideSquare, product.images ? null : classes.noImage]}
                              style={{
                                backgroundImage: product.images ? `url(${product.images[3]})` : `url(${placeholder3})`,
                              }}
                            ></Box>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box px={3}>
                    <Box>
                      <Typography variant="h5" component="h4" color="primary">
                        Farm
                      </Typography>
                      <Typography variant="h6" component="p">
                        <FontAwesomeIcon icon={faWarehouse} /> {farm.company}
                      </Typography>
                    </Box>

                    <Box mt={2}>
                      <Typography variant="h5" component="h4" color="primary">
                        Location
                      </Typography>
                      <Typography variant="h6" component="p">
                        <FontAwesomeIcon icon={faGlobeAmericas} /> {product.city}, {product.state}, {product.country}
                      </Typography>
                    </Box>

                    <Box my={2}>
                      <Typography variant="h5" component="h4" color="primary">
                        Altitude
                      </Typography>
                      <Typography variant="h6" component="p">
                        <FontAwesomeIcon icon={faMountain} /> {product.altitude} mt.
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="h5" component="h4" color="primary">
                        Process
                      </Typography>
                      <Typography variant="h6" component="p">
                        <FontAwesomeIcon icon={faLeaf} /> {product.process}
                      </Typography>
                    </Box>
                    <Box mt={2}>
                      <Typography variant="h5" component="h4" color="primary">
                        Variety
                      </Typography>
                      <Typography variant="h6" component="p">
                        <FontAwesomeIcon icon={faSeedling} /> {product.variety}
                      </Typography>
                    </Box>

                    {product.availability ? (
                      <Box my={1} style={{ overflow: 'hidden' }}>
                        <Typography variant="h5" component="h4" color="primary">
                          Availability
                        </Typography>
                        <img src={Bags} style={{ width: '30px', margin: '10px 0', float: 'left' }} />
                        <Typography
                          variant="h6"
                          component="span"
                          display={'inline'}
                          color={'#000'}
                          style={{ float: 'left', marginTop: '10px', marginLeft: '10px' }}
                        >
                          {product.availability} bags
                        </Typography>
                      </Box>
                    ) : null}
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Grid container>
              <Grid item md={12}>
                <Box px={3}>
                  <Typography variant="h4" component="h4" color="primary">
                    Cupping
                  </Typography>

                  <Box my={2}>
                    <Typography variant="body1" component="p" color={'#000'}>
                      {product.description}
                    </Typography>
                  </Box>

                  {product.flavors ? (
                    <Box my={1}>
                      <Typography variant="h5" component="h4" color={'#000'}>
                        Flavors
                      </Typography>
                    </Box>
                  ) : null}

                  <Box mt={1}>
                    {product.flavors
                      ? product.flavors.map((item, index) => (
                          <Chip label={item} key={index} color="primary" style={{ margin: '0 3px' }} />
                        ))
                      : ''}
                  </Box>

                  <Box my={2}>
                    <Typography variant="h5" component="p" color="primary">
                      Rate:
                    </Typography>
                  </Box>
                  <Box mt={1}>
                    <Typography variant="h5" component="p" color={'#000'}>
                      {product.rate}
                    </Typography>
                  </Box>

                  {product.prizes ? (
                    <Box my={3}>
                      <Typography variant="h5" component="h4" color="primary">
                        Certifications or recognitions
                      </Typography>
                    </Box>
                  ) : null}

                  <Box mt={1} mb={2}>
                    {product.prizes
                      ? product.prizes.map(prize => (
                          <p>
                            <FontAwesomeIcon icon={faAward} color={'#308f9a'} /> {prize}
                          </p>
                        ))
                      : ''}
                  </Box>

                  <Box mt={3}>
                    <Typography variant="h5" component="p" color="primary">
                      Price
                    </Typography>
                  </Box>

                  <Box mt={1}>
                    <Typography variant="h5" component="h4">
                      ${product.price.toFixed(2).replace('.', ',')}/Kg at farm gate
                    </Typography>
                  </Box>

                  {/* <Typography variant="h5" component="p" color={'#000'}></Typography> */}
                </Box>
              </Grid>
            </Grid>

            <Box p={4}>
              <Divider />
            </Box>

            <Box py={2} px={4}>
              <Typography variant="h5" component="h4" color={'#000'} align="left">
                Buy this coffee and receive personalized content about this farm
              </Typography>

              <a
                href="http://quote.fantine.io/"
                target="_blank"
                style={{ textTransform: 'none', textDecoration: 'none' }}
              >
                <Button variant="contained" color="primary" style={{ marginTop: '20px' }} size="large">
                  Get a Quote <NavigateNextIcon fontSize="small" />
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button variant="contained" color="secondary" style={{ marginTop: '20px' }} size="large">
                  Get a Sample <NavigateNextIcon fontSize="small" />
                </Button>
              </a>
            </Box>
            <Box p={4}>
              <Divider />
            </Box>

            <Grid item md={12}>
              <Box mt={3} mb={2} ml={3}>
                <Typography variant="h4" component="h4" color="primary">
                  About the Farm
                </Typography>
              </Box>

              <Box px={3}>
                <Box mt={1}>
                  <Typography variant="h5" component="h5" color="white">
                    {farm.firstName ? (
                      <span>
                        {farm.firstName} {farm.lastName} -{' '}
                      </span>
                    ) : null}{' '}
                    {farm.company}
                  </Typography>
                </Box>
                <Box mt={1}>
                  <Typography variant="body1" component="p">
                    {farm.description}
                  </Typography>

                  <Link color="primary" className={classes.link} to={`/profile/${farm.id}`}>
                    <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                      See More <NavigateNextIcon fontSize="small" />
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Container>
        </Box>
      </Box>
    );
  } else {
    //Loading
    return <Loading />;
  }
};
export default ProductWrapped;
