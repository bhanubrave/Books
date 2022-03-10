import React, {useState} from 'react';
import { View, StyleSheet, Alert} from 'react-native';
import ListOfBooks from './ListOfBooks';
import {TextInput, Button, Appbar, Provider as PaperProvider} from 'react-native-paper';

const LoginPage = ({navigation}) => {
  const [text, onChangeText] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  
  const visible = () => {
    setSecure(false);
  }
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
    <View style={styles.view}>
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
        secureTextEntry={secure}
        right={<TextInput.Icon name="eye" onPress={visible} />}
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
  title: {
    fontSize: 18,
    color: 'black',
    padding: 10,
  },
  view: {
    margin: 20,
    padding: 10,
    top: 100,
  },
button: {
    margin: 20,
    width: 200,
    alignSelf: 'center'
  },
});

export default LoginPage;
