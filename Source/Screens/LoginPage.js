import React, {useState} from 'react';
import { View, StyleSheet, Image, ImageBackground} from 'react-native';
import ListOfBooks from './ListOfBooks';
import {TextInput, Button,Text, Appbar} from 'react-native-paper';



const LoginPage = ({navigation}) => {

  const  mailId =  'bhanu@gmail.com';
  const passkey = 'bhanu';

  const [text, onChangeText] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [validUser, isValidUser] = useState(true);
  const [validPassword, isValidPassword] = useState(true);
  const handleValidUser = (text) =>  {
    if (text !== mailId) {
      isValidUser(false);
    } else {
      isValidUser(true);  
    }
  };
  const handleValidPassword = (password) =>  {
    if (password !== passkey) {
      isValidPassword(false);
    } else {
      isValidPassword(true);  
    }
  };

  const id = () => {
    if (text == mailId && password == passkey ) {
      navigation.navigate(ListOfBooks);
    }
    else{
      isValidPassword(false);
      isValidUser(false);
    }
  };

  return  <>
    <ImageBackground source={require('../../Assets/bg1.jpg')} 
  resizeMode='cover' style={styles.cover} > 
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
        theme={{
          colors: {
                text: '#043927',
             }
       }}
        onChangeText={onChangeText}
        right={<TextInput.Icon name="gmail" color='#3bb143'
       />}
       onEndEditing={(e) => handleValidUser(e.nativeEvent.text) }
      />
      { validUser ? null : <Text style={styles.error}>Enter Valid UserName</Text> }
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        theme={{
          colors: {
                text: '#311432',
             }
       }}
        onChangeText={setPassword}
        
        secureTextEntry={secure ? true : false}
        right={<TextInput.Icon name={secure ? 'eye-off-outline' : 'eye-outline'}  onPress={ () => setSecure(!secure)}
                 color={ secure ? '#3bb143' : '#fc6600'} />}
         onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
      />
      { validPassword ? null : <Text style={styles.error}>Enter Correct Password</Text> }
     
     
      <View style={styles.button}>
        <Button mode="contained" onPress={id}>
          LogIn
        </Button>
       
      </View>
      
    </View>
     </ImageBackground> 
    </>
};

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    margin: 10,
  },
  image:{
    alignSelf: 'center',
    width: '80%',
    height: '25%',
    borderRadius: 20,
  },
  cover:{
    width: '100%', height: '100%'
  },
  title: {
    fontSize: 18,
    color: 'black',
    padding: 10,
  },
  view: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 80,
  },
button: {
    margin: 20,
    width: 200,
    alignSelf: 'center'
  },
  error:{
    color: '#c21807',
    marginHorizontal: 10,
    fontSize: 16,
    fontStyle: 'italic',
  }
});

export default LoginPage;
