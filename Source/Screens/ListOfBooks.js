import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {Switch} from 'react-native-switch';
import {
  Card,
  Appbar,
  Title,
  Paragraph,
  Provider as PaperProvider,
  Button,
} from 'react-native-paper';

const ListOfBooks = ({route, navigation}) => {
  const [header, setHeader] = useState(false);
  const toggleSwitch = () => setHeader(previousState => !previousState);
  const [indicator, setIndicator] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [books, setBooks] = useState([]);
  const [state, setState] = useState('BUY');


  const AllBooks = async () => {
    try {
      setIndicator(true);
      await axios
        .get('https://api.publicapis.org/entries?category=books&https=true')
        .then(response => {
          const myBook = response.data;
          setBooks(myBook);
        });
      setIndicator(false);
    } catch (err) {
      setErrorMessage('Error in API calling');
    }
  };

  useEffect(() => {
    AllBooks();
  }, []);


  return (
     
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title="Books" />
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={header ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          activeText={'My Collection'}
          inActiveText={'List of Books'}
          backgroundInactive={'grey'}
          switchWidthMultiplier={5}
          value={header}
        />
      </Appbar.Header>
      <View style={styles.main}>
        {indicator ? (
          <ActivityIndicator style={styles.indicator} size={'large'} />
        ) : (
          <FlatList
            style={styles.flatlist}
            key={header ? 2 : 1}
            numColumns={header ? 2 : 1}
            data={books.entries}
            showsVerticalScrollIndicator={false}
            keyExtractor={(entries, index) => index}
            renderItem={({item, index}) => {
              if (header) {
                return (
                  <Card style={styles.flatview}>
                    <Card.Content style={styles.content}>
                      <Card.Cover source={require('../../Assets/image.jpeg')} />
                      <Title style={{fontSize: 20, color: '#248961'}}>
                        {index}.{item.API}
                      </Title>
                      <Paragraph>
                        <Text style={{fontSize: 16, color: '#987654'}}>
                          {item.Description}
                        </Text>
                      </Paragraph>
                    </Card.Content>
                    <Card.Actions style={{alignSelf: 'flex-end'}}>
                      <Button
                        mode="contained"
                        onPress={() =>
                          navigation.navigate('PurchaseScreen', {
                            API: item.API,
                            id: item.Description,
                          })
                        }>
                        {state}
                      </Button>
                    </Card.Actions>
                  </Card>
                );
              } else {
                
                return (
                  <Card style={styles.flatview}>
                    <Card.Content style={styles.content}>
                      <Card.Cover source={require('../../Assets/book.jpg')} />
                      <Title style={{color: '#248961', fontSize: 20}}>
                        {index}.{item.API}
                      </Title>
                      <Paragraph>
                        <Text>{item.Description}</Text>
                      </Paragraph>
                      <Card.Actions style={{alignSelf: 'flex-end'}}>
                        <Button
                          mode="contained"
                          onPress={() =>
                            navigation.navigate('PurchaseScreen',
                               { API: item.API,
                               id: item.Description, 
                              //  state: {setState}
                               }
                            )
                          }>
                          {state}
                        </Button>
                      </Card.Actions>
                    </Card.Content>
                  </Card>
                );
              }
            }}
          />
        )}
        <Text style={styles.indicator}>{errorMessage}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flatlist: {
    margin: 5,
  },
  switch1: {
    margin: 10,
  },
  switch: {
    flexDirection: 'row',
    alignSelf: 'center',
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  flatview: {
    flex: 1,
    flexDirection: 'column',
    fontSize: 18,
    margin: 5,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
  },
  // card: {flex: 1, flexDirection: 'column', justifyContent: 'space-between'},
  touch: {
    width: 80,
    height: 40,
    alignSelf: 'flex-end',
    backgroundColor: '#443344',
  },
  maintoptext: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
  },
  mainbottomtext: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'green',
  },
  main: {
    flex: 1,
  },
});

export default ListOfBooks;
