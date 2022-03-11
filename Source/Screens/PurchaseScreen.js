import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Button, Appbar, Card, Title, Paragraph} from 'react-native-paper';
import ListOfBooks from './ListOfBooks';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';

const PurchaseScreen = ({route, navigation}) => {
  const [location, setLocation] = useState([]);
  const [indicator, setIndicator] = useState(false);

  const geoLocation = () => {
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
        },
        // error => {
        //   // See error code charts below.
        //   console.log(error.code, error.message);
        // },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };
  

  const Hyderabad = {
    lat: 17.385044,
    lng: 78.486671,
  };

  const position = async () => {
    await Geocoder.geocodePosition(Hyderabad)
      .then(res => {
        // console.log(res);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    position();
  }, []);

  const address = async () => {
    setIndicator(true);
    await Geocoder.geocodeAddress('Kacheguda')
      .then(res => {
        const add = res;
        setLocation(add);
        // console.log(res);
      })
      .catch(err => console.log(err));
    setIndicator(false);
  };

  useEffect(() => {
    address();
  }, []);


  const id = route.params.id;
  const API = route.params.API;

  // const state = route.params.state.setState;
  // console.log(state);

  const [title, setTitle] = useState('Buy');
  const click = useCallback(() => navigation.navigate(ListOfBooks));
  const press = () => {
    setTitle('Purchased!');
    alert('Ordered Placed Sucessfully!');
    click();
    // state('Purchased!')
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={click} />
        <Appbar.Content title="PurchaseScreen" />
      </Appbar.Header>
      <View style={styles.default}>
        <Card mode="outlined">
          <Card.Content>
          <Card.Cover source={require('../../Assets/book.jpg')} />
            <Title>
              <Text style={{fontSize: 18, color: '#248961'}}>{API}</Text>
            </Title>
            <Paragraph>
              <Text style={{fontSize: 18, color: '#6c757d'}}>{id}</Text>
            </Paragraph>
            
          </Card.Content>
        </Card>
      </View>
      <View style={styles.default}>
        {indicator ? (
          <ActivityIndicator style={styles.indicator} size={'large'} />
        ) : (
          <FlatList
            data={location}
            keyExtractor={() => location}
            renderItem={({item}) => {
              return (
                <Card mode="outlined">
                  <Card.Content>
                    <Title style={{fontSize: 20, color: '#137799'}}>
                      Address
                    </Title>
                    <Paragraph>
                      <Text style={{fontSize: 18, color: '#6c757d'}}>
                        Street: {item.feature} {'\n'}
                      </Text>
                      <Text style={{fontSize: 18, color: '#6c757d'}}>
                        City: {item.locality}
                        {'\n'}
                      </Text>
                      <Text style={{fontSize: 18, color: '#6c757d'}}>
                        State: {item.adminArea}
                        {'\n'}
                      </Text>
                      <Text style={{fontSize: 18, color: '#6c757d'}}>
                        Country: {item.country}
                        {'\n'}
                      </Text>
                      <Text style={{fontSize: 18, color: '#6c757d'}}>
                        Pin-Code: {item.postalCode}
                      </Text>
                    </Paragraph>
                  </Card.Content>
                </Card>
              );
            }}
          />
        )}
      </View>
      <View style={styles.button}>
        <Button mode="contained" onPress={press}>
          {title}
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  default: {
    margin: 5,
    
  },
  button: {
    margin: 10,
    paddingHorizontal: 30,
  },
});

export default PurchaseScreen;


//   /* <KeyboardAvoidingView>
//         <Text style={styles.text}>Address</Text>
//         <TextInput style={styles.input}
//          textContentType={'fullStreetAddress'}
//         defaultValue={'StreetName'}
//         ></TextInput>
//         <TextInput style={styles.input} textContentType={'addressCity'}
//         defaultValue={'City'} />
//         <TextInput style={styles.input} textContentType={'addressState'}
//         defaultValue={'StateName'}/>
//         <TextInput style={styles.input} textContentType={'postalCode'}
//         defaultValue={'PostalCode'} />
//         </KeyboardAvoidingView> */


// // import GetLocation from 'react-native-get-location';

// // GetLocation.getCurrentPosition({
// //   enableHighAccuracy: true,
// //   timeout: 15000,
// // })
// // .then(location => {
// //   console.log(location);
// // })
// // .catch(error => {
// //   const { code, message } = error;
// //   console.warn(code, message);
// // })
