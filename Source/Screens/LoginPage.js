import React, {useState} from 'react';
import { View, StyleSheet, Alert, Image} from 'react-native';
import ListOfBooks from './ListOfBooks';
import {TextInput, Button, Appbar, Provider as PaperProvider, Card} from 'react-native-paper';

const LoginPage = ({navigation}) => {
  const [text, onChangeText] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  

  const id = () => {
    if (text !== 'bhanu@gmail.com') {
      Alert.alert('enter valid mail id');
    } else if (password !== 'bhanu') {
      Alert.alert('enter valid password');
    } else {
      navigation.navigate(ListOfBooks);
    }
  };

  return ( <>
    <Appbar.Header>
      <Appbar.Content title="LogIn"  />
    </Appbar.Header>
  
    <View  style={styles.view}>
    <Image source={require('../../Assets/LogoMain2.png')} resizeMode='contain'
    style={styles.image} />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Mail-Id"
        onChangeText={onChangeText}
        right={<TextInput.Icon name="gmail"  />}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        onChangeText={setPassword}
        secureTextEntry={secure ? true : false}
        right={<TextInput.Icon name={secure ? 'eye-off-outline' : 'eye-outline'}  onPress={ () => setSecure(!secure)} />}
      />
     
      <View style={styles.button}>
        <Button mode="contained" onPress={id}>
          LogIn
        </Button>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    margin: 10,
    color: 'blue'
  },
  image:{
    alignSelf: 'center',
    width: '80%',
    height: '30%',
  },
  title: {
    fontSize: 18,
    color: 'black',
    padding: 10,
  },
  view: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
button: {
    margin: 20,
    width: 200,
    alignSelf: 'center'
  },
});

export default LoginPage;
