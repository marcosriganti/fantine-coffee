import React from 'react';
import Header from './header'
import Footer from './footer'
import Grid from '@material-ui/core/Grid';

const Layout = (props) => {
    return <div style={{paddingTop:79}}>
        <Header/>
        {props.children}
        <Footer/></div>
}
export default Layout