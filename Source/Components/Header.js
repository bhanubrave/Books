import React from "react";
import {View, Text, Switch} from 'react-native';


const Header = props => {
   return <View>
        <Switch>{props.Switch}</Switch>
    </View>
};


export default Header;