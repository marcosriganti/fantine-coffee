import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

//DB
import { useDocument } from '../helper/firestore';
import { firestore } from '../firebase';

import { faMountain, faLeaf, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import placeholder1 from '../assets/placeholder_1.jpg';
import placeholder2 from '../assets/placeholder_2.jpg';
import placeholder3 from '../assets/placeholder_3.jpg';
import placeholderUser from '../assets/placeholder_user.png';

const ProductItem = ({ product, classes, company }) => {
  const [farm, loading] = useDocument(() => firestore.collection('users').doc(product.user_id));
  return (
    <Link to={`/product/${product.name}`}>
      <Box boxShadow={2}>
        <Box flex={4} display="flex" style={{ border: '2px solid #000' }}>
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
          >
            <Box m={1}>
              <Typography
                component={'h3'}
                variant={'h4'}
                display="flex"
                style={{ fontWeight: 'bold', textShadow: '1px 1px 2px #666' }}
              >
                ${product.price.toFixed(2).replace('.', ',')}/Kg
                <br />
              </Typography>
              <Typography component={'h4'} variant={'h5'} display="flex">
                {product.rate} <small>points</small>
              </Typography>
              <Box p={1} display="flex" className={classes.productInfo}>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <Typography component={'h5'} variant={'h6'}>
                      {company ? company : farm.company}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component={'p'} variant={'body1'}>
                      <FontAwesomeIcon icon={faMountain} /> {product.altitude}mt.
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <FontAwesomeIcon icon={faLeaf} /> {product.process}
                  </Grid>
                  <Grid item xs={12} style={{ margin: '3px 0' }}>
                    <Typography component={'p'} variant={'body1'}>
                      <FontAwesomeIcon icon={faGlobeAmericas} /> {product.state}, {product.country}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {product.flavors
                      ? product.flavors.map((item, index) => (
                          <Chip label={item} key={index} size={'small'} color="primary" style={{ margin: '0 3px' }} />
                        ))
                      : ''}
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
          <Box flex={1} flexDirection={'column'} display={'flex'}>
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
    </Link>
  );
};

export default ProductItem;
