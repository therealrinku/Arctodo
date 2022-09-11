import React, {useEffect, useState, type PropsWithChildren} from 'react';
import {
  Button,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

const Home = () => <Text>Home!</Text>;
const Settings = () => <Text>Settings!</Text>;

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const Dummy = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  let ScreenHeight = Dimensions.get('window').height;

  const [data, setData]: any = useState([]);
  const [showTextInput, setShowTextInput] = useState(false);

  const addTodo = () => {
    setData([...data, 'new tood']);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            minHeight: ScreenHeight,
            paddingTop: '10%',
            paddingLeft: '5%',
          }}>
          {data.map((d: any, i: any) => {
            return <Text key={i}>{d}</Text>;
          })}

          <NavigationContainer>
            {showTextInput && <TextInput editable />}
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: '25%',
                width: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}>
              <Button title="+" color="green" onPress={addTodo} />
              <Text></Text>
            </View>
          </NavigationContainer>
          {/* <MyTabs /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Dummy;
