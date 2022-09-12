import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
  TextInput,
  Image,
  Alert,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

function TodoInputView({onAdd, toggle, todos}: any) {
  const [input, setInput] = useState('');

  return (
    <TextInput
      style={styles.input}
      onChangeText={setInput}
      value={input}
      placeholder="Add new todo"
      autoFocus
      onEndEditing={toggle}
      onSubmitEditing={() => {
        const indexOfThisToday = todos.findIndex(
          (t: {todo: string}) =>
            t.todo.toLowerCase().trim() === input.toLowerCase().trim(),
        );
        if (indexOfThisToday >= 0) {
          return Alert.alert(
            'Todo alert exists with same name',
            'Maybe you forgot :)',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
          );
        }

        const newTodo = {todo: input, completed: false};
        onAdd((prev: any) => [...prev, newTodo]);
        toggle();
        const addToLocalStorage = async () => {
          try {
            const dto = JSON.stringify([...todos, newTodo]);
            await AsyncStorage.setItem('todos', dto);
          } catch (e) {
            Alert.alert('Something went wrong', '', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
          }
        };

        addToLocalStorage();
      }}
    />
  );
}

function RadioButton(props: any) {
  return (
    <View
      style={[
        {
          display: 'flex',
          height: 20,
          width: 20,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: 'green',
          alignItems: 'center',
          justifyContent: 'center',
        },
        props.style,
      ]}>
      {props.selected ? (
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 6,
            backgroundColor: 'green',
          }}
        />
      ) : null}
    </View>
  );
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [data, setData]: any = useState([]);

  const [showAddTodoBox, setShowAddTodoBox] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await AsyncStorage.setItem('todos', '');
      // try {
      //   const data = await AsyncStorage.getItem('todos');

      //   if (data !== null) {
      //     setData(JSON.parse(data));
      //   }
      // } catch (e) {
      //   Alert.alert('Something went fishy', '', [
      //     {
      //       text: 'Cancel',
      //       onPress: () => console.log('Cancel Pressed'),
      //       style: 'cancel',
      //     },
      //     {text: 'OK', onPress: () => console.log('OK Pressed')},
      //   ]);
      // }
    };

    getData();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          zIndex: 2,
          minHeight: 40,
          padding: 20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 22, flex: 15, fontWeight: 'bold'}}>
          Arctodo
        </Text>
        <Pressable>
          <Image
            style={{width: 20, height: 20, flex: 1}}
            source={{
              uri: 'https://img.icons8.com/ios-glyphs/2x/dots-loading.png',
            }}
          />
        </Pressable>
      </View>
      <ScrollView style={{height: '92%', paddingTop: 50}}>
        <View style={{padding: 15, height: '92%'}}>
          {data.filter((d: {completed: boolean}) => !d.completed).length >
            0 && (
            <Text
              style={{
                paddingVertical: 10,
                paddingHorizontal: 6,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Todos
            </Text>
          )}
          {data
            .filter((d: {completed: boolean}) => !d.completed)
            .map((d: {todo: string; completed: boolean}, i: number) => {
              return (
                <View
                  key={d.todo}
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 10,
                  }}>
                  <BouncyCheckbox
                    size={25}
                    fillColor="green"
                    unfillColor="#FFFFFF"
                    text={d.todo}
                    isChecked={d.completed}
                    iconStyle={{borderColor: 'red'}}
                    innerIconStyle={{borderWidth: 2}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={() => {
                      const todosCopy = [...data];
                      todosCopy[i].completed = !todosCopy[i].completed;
                      setData(todosCopy);
                    }}
                  />
                </View>
              );
            })}

          {data.filter((d: {completed: boolean}) => d.completed).length > 0 && (
            <Text
              style={{
                paddingVertical: 10,
                paddingHorizontal: 6,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Completed Todos
            </Text>
          )}
          {data
            .filter((d: {completed: boolean}) => d.completed)
            .map((d: {todo: string; completed: boolean}, i: number) => {
              return (
                <View
                  key={d.todo}
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 10,
                  }}>
                  <BouncyCheckbox
                    size={25}
                    fillColor="green"
                    unfillColor="#FFFFFF"
                    text={d.todo}
                    isChecked={d.completed}
                    iconStyle={{borderColor: 'red'}}
                    innerIconStyle={{borderWidth: 2}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={() => {
                      const todosCopy = [...data];
                      todosCopy[i].completed = !todosCopy[i].completed;
                      setData(todosCopy);
                    }}
                  />
                </View>
              );
            })}
        </View>
      </ScrollView>

      {/*show add todo field */}
      {showAddTodoBox && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            zIndex: 1,
            backgroundColor: '#343434',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            paddingHorizontal: 2,
            paddingVertical: 5,
            // borderTopColor: 'red',
          }}>
          <TodoInputView
            onAdd={setData}
            todos={data}
            toggle={() => setShowAddTodoBox(false)}
          />
        </View>
      )}

      <View
        style={{
          paddingVertical: 5,
          height: '8%',
          backgroundColor: '#343434',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
        }}>
        <Pressable
          onPress={() => setShowAddTodoBox(true)}
          style={{
            backgroundColor: 'green',
            width: 45,
            height: 45,
            borderRadius: 30,
          }}>
          <Text
            style={{
              fontSize: 36,
              display: 'flex',
              flexDirection: 'row',
              textAlign: 'center',
              justifyContent: 'center',
              height: 45,
              width: 45,
              paddingBottom: 2,
            }}>
            +
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#343434',
    borderRadius: 10,
  },
});

export default App;
