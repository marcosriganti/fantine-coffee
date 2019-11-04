import React, { useState } from 'react';
//Styles
import Chip from '@material-ui/core/Chip';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/styles';

//Forms
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';

import PieChart from 'react-minimal-pie-chart';

import co from '../assets/co_1.svg';
import ColombiaMap from '../components/colombia';
import { firestore } from '../firebase';
import { useCollection } from '../helper/firestore';
import ProductItem from '../components/productItem';

const List = () => {
  const classes = useStyles();
  let data = [
    { title: 'Sweet', tag: 'sweet', value: 10, color: '#e65832' },
    { title: 'Floral', tag: 'floral', value: 8, color: '#da0d68' },
    { title: 'Fruity', tag: 'fruity', value: 20, color: '#da1d23' },
    { title: 'Sour', tag: 'sour', value: 10, color: '#e7b80a' },
    { title: 'Green', tag: 'green', value: 10, color: '#187a2f' },
    { title: 'Spices', tag: 'spices', value: 10, color: '#ad213e' },
    { title: 'Nutty', tag: 'nuttycocoa', value: 10, color: '#a87b66' },
  ].map(entry => {
    return (entry = {
      ...entry,
      style: {
        opacity: 0.5,
        strokeWidth: NORMAL_WIDTH,
      },
    });
  });
  const [needs, setNeeds] = useState({ blending: false, single: false, micro: false, gems: false });
  const [process, setProcess] = useState({ Honey: false, Natural: false, Washed: false });
  const [flavors, setFlavor] = useState([]);
  const [hoverState, setHoverState] = useState(null);
  const [states, setState] = useState([]);
  // Filters
  const [dataState, setDataState] = useState(data);
  const [collection, loading] = useCollection(() => firestore.collection('products'));

  if (!loading) {
    document.title = 'Fantine';
  }
  const handleNeedChange = name => event => {
    setNeeds({ ...needs, [name]: event.target.checked });
  };

  const handleProcessChange = name => event => {
    setProcess({ ...process, [name]: event.target.checked });
  };

  //Chart Filter
  const resetFilters = () => {
    setNeeds({ blending: false, single: false, micro: false, gems: false });
    setProcess({ Honey: false, Natural: false, Washed: false });
    setFlavor([]);
    setState([]);
    // colombia_svg.map()
    let list = document.getElementById('colombia_svg').getElementsByTagName('path');
    for (let item of list) {
      item.style.fill = '';
    }
    let newData = dataState.map(entry => {
      return (entry = {
        ...entry,
        style: {
          opacity: 0.5,
          strokeWidth: NORMAL_WIDTH,
        },
      });
    });
    setDataState(newData);
  };
  const onClick = (event, propsData, index) => {
    let newFlavors = flavors;

    const data = propsData.map((entry, i) => {
      if (i == index) {
        if (newFlavors.includes(entry.tag)) {
          newFlavors.splice(newFlavors.indexOf(entry.tag), 1);
        } else {
          newFlavors.push(entry.tag);
        }
        setFlavor(newFlavors);
      }
      return {
        ...entry,
        ...{
          style: {
            ...entry.style,
            strokeWidth: newFlavors.includes(entry.tag) ? FULL_WIDTH : NORMAL_WIDTH,
            opacity: newFlavors.includes(entry.tag) ? 1 : 0.5,
          },
        },
      };
    });
    setDataState(data);
    //Mark selected
  };
  const onMouseOver = (event, propsData, index) => {
    const data = propsData.map((entry, i) => {
      return i === index
        ? {
            ...entry,
            style: {
              ...entry.style,
              opacity: 1,
            },
            // color: 'grey',
          }
        : entry;
    });

    setDataState(data);
  };
  const onMouseOut = (event, propsData, index) => {
    const data = propsData.map((entry, i) => {
      return i === index
        ? {
            ...entry,
            style: {
              ...entry.style,
              opacity: entry.style.strokeWidth === FULL_WIDTH ? 1 : 0.5,
            },
          }
        : entry;
    });

    setDataState(data);
  };
  //States

  const handleToggleState = name => {
    const selectedStates = states;
    if (selectedStates.includes(name)) {
      selectedStates.splice(selectedStates.indexOf(name), 1);
    } else {
      selectedStates.push(name);
    }
    setState(selectedStates);
  };

  const needs_filters = Object.keys(needs);
  const process_filters = Object.keys(process);

  const productFilters = product => {
    let valid = true;
    //Process Filter
    if (process_filters.every(item => process[item] === false) !== true) {
      if (process_filters.includes(product.process) && process[product.process]) {
        valid = true;
      } else {
        return false;
      }
    }
    //Needs
    let needsCheck1, needsCheck2, needsCheck3, needsCheck4;
    if (needs_filters.every(item => needs[item] === false) !== true) {
      if (needs['blending']) needsCheck1 = product.rate <= 80;
      if (needs['single']) needsCheck2 = product.rate > 80 && product.rate < 85;
      if (needs['micro']) needsCheck3 = product.rate >= 85 && product.rate < 90;
      if (needs['gems']) needsCheck4 = product.rate >= 90;
      valid = needsCheck1 || needsCheck2 || needsCheck3 || needsCheck4;
    }

    if (states.length > 0) {
      if (states.includes(product.state) && valid) {
        valid = true;
      } else {
        valid = false;
      }
    }
    //Flavors
    if (product.flavors && flavors.length > 0) {
      if (flavors.every(flavor => product.flavors.includes(flavor)) && valid) {
        valid = true;
      } else {
        valid = false;
      }
    }

    return valid;
  };
  return (
    <Box py={3} style={{ minHeight: '85vh' }}>
      {/* Title  */}
      <Box py={3} mb={3}>
        <Container maxWidth="lg">
          <Box flex={3} display="flex">
            <Box flex={2}>
              <Typography variant="h4" component="h3">
                Our coffee
              </Typography>
              <Box mt={1}>
                <Typography variant="body1" component="p">
                  There are several factors that cause Colombia to stand out for its reputation of high-quality coffee
                  beans. Rich volcanic soil and predominantly shade-grown cultivation, the alternation of wet and dry
                  seasons; and the different latitudes of the country make it possible to harvest coffee in the
                  highlands at altitudes around 2100 masl, as well as on the slopes of the Andes mountains (1300 masl).
                  On top of that, Colombian coffee is almost 100% hand-picked and that is the only way to pick ripe
                  coffee cherries, which is, in turn, one of the main factors to achieve pleasant notes, consistency,
                  and balance in the cup. Hence Colombia can claim itself as the country with the greatest diversity of
                  coffee flavors and a wider range of coffee profiles. With Fantine, you can find different types of
                  coffee quality, varieties, and profiles and buy it directly from farmers.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Product List  */}
      <Container maxWidth="lg">
        <Box className={classes.root} pt={3} mb={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box bgcolor="primary.main" color="secondary.main" p={2} boxShadow={1}>
                <Typography variant="h5" component="h3">
                  Filters
                </Typography>
                <Box my={2}>
                  <Divider />
                </Box>
                <Typography variant="h6" component="h4">
                  Region
                </Typography>

                <ColombiaMap
                  style={{ width: '100%' }}
                  // onOut={() => {
                  //   setHoverState('');
                  // }}
                  onClick={handleToggleState.bind(this)}
                  onHover={name => {
                    setHoverState(name);
                  }}
                ></ColombiaMap>
                <p>&nbsp;{hoverState}</p>
                {states.map((state, index) => {
                  return (
                    <Chip
                      key={index}
                      label={state}
                      // onDelete={() => {
                      // handleToggleState(state);
                      // }}
                      color="secondary"
                      size="small"
                    />
                  );
                })}
                <Box my={2}>
                  <Divider />
                </Box>
                <FormControl component="fieldset" className={classes.formControl}>
                  <Typography variant="h6" component="h4">
                    Coffee Needs
                  </Typography>
                  <FormControlLabel
                    value="Blending"
                    control={<Checkbox checked={needs.blending !== undefined && needs.blending} />}
                    label={'Blending < 80'}
                    onChange={handleNeedChange('blending')}
                  />
                  <FormControlLabel
                    value="Single Origin"
                    control={<Checkbox checked={needs.single} />}
                    label="Single Origin 80-85"
                    onChange={handleNeedChange('single')}
                  />
                  <FormControlLabel
                    value="Micro-lots"
                    control={<Checkbox checked={needs.micro} />}
                    label="Micro-lots  85-90"
                    onChange={handleNeedChange('micro')}
                  />
                  <FormControlLabel
                    value="Gems"
                    control={<Checkbox checked={needs.gems} />}
                    label="Gems  > 90"
                    onChange={handleNeedChange('gems')}
                  />
                </FormControl>
                <Box my={2}>
                  <Divider />
                </Box>
                <FormControl component="fieldset" className={classes.formControl}>
                  <Typography variant="h6" component="h4">
                    Processing
                  </Typography>

                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={process.Honey} />}
                      label="Honey"
                      onChange={handleProcessChange('Honey')}
                    />
                    <FormControlLabel
                      control={<Checkbox checked={process.Natural} />}
                      label="Natural"
                      onChange={handleProcessChange('Natural')}
                    />
                    <FormControlLabel
                      control={<Checkbox checked={process.Washed} />}
                      label="Washed"
                      onChange={handleProcessChange('Washed')}
                    />
                  </FormGroup>
                </FormControl>
                <Box my={2}>
                  <Divider />
                </Box>
                <Typography variant="h6" component="h4">
                  Flavours
                </Typography>
                <div style={{ width: '130%', marginLeft: '-15%' }}>
                  <PieChart
                    onMouseOver={onMouseOver}
                    totalValue={90}
                    data={dataState}
                    label={props => {
                      return props.data[props.dataIndex].title;
                    }}
                    labelStyle={{
                      fontSize: '4px',
                      fontFamily: 'Karla,sans-serif',
                      fill: '#fff',
                    }}
                    segmentsStyle={{ transition: 'stroke .3s' }}
                    onClick={onClick}
                    labelPosition={60}
                    onMouseOut={onMouseOut}
                    segmentsStyle={{ transition: 'all .3s' }}
                    startAngle={250}
                    animate
                  />
                </div>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginTop: '20px' }}
                  size="small"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box px={1}>
                <Grid container spacing={2}>
                  {collection.filter(productFilters).map(product => {
                    return (
                      <Grid item xs={12} md={6} key={product.id} className={classes.product}>
                        <ProductItem product={product} classes={classes}></ProductItem>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    '& > .fa': {
      margin: theme.spacing(2),
    },
  },

  FormLabel: {
    color: theme.palette.secondary.main,
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
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#7C7C7C',
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

const FULL_WIDTH = 34;
const NORMAL_WIDTH = 28;

export default List;
