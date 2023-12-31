import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { View, Text, Linking } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
// redux
import { connect } from 'react-redux';
import { fetchLeaders } from '../redux/ActionCreators';
const mapDispatchToProps = (dispatch) => ({
  fetchLeaders: () => dispatch(fetchLeaders())
});

function HomeNavigatorScreen() {
  const HomeNavigator = createStackNavigator();
  return (
    <HomeNavigator.Navigator initialRouteName='Home'
    screenOptions={{
      headerStyle: { backgroundColor: '#7cc' },
      headerTintColor: '#fff',
      headerTitleStyle: { color: '#fff' }
    }}>
      <HomeNavigator.Screen name='Home' component={Home}
        options={({ navigation }) => ({
          headerTitle: 'Home',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </HomeNavigator.Navigator>
  );
}

function AboutNavigatorScreen() {
  const AboutNavigator = createStackNavigator();
  return (
    <AboutNavigator.Navigator initialRouteName='About'
    screenOptions={{
      headerStyle: { backgroundColor: '#7cc' },
      headerTintColor: '#fff',
      headerTitleStyle: { color: '#fff' }
    }}>
      <AboutNavigator.Screen name='About' component={About}
        options={({ navigation }) => ({
          headerTitle: 'About',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </AboutNavigator.Navigator>
  );
}

function MenuNavigatorScreen() {
  const MenuNavigator = createStackNavigator();
  return (
    <MenuNavigator.Navigator  initialRouteName='Menu'
    screenOptions={{
      headerStyle: { backgroundColor: '#7cc' },
      headerTintColor: '#fff',
      headerTitleStyle: { color: '#fff' }
    }}>
      <MenuNavigator.Screen name='Menu' component={Menu}
        options={({ navigation }) => ({
          headerTitle: 'Menu',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
      <MenuNavigator.Screen name='Dishdetail' component={Dishdetail}
        options={{
          headerTitle: 'Dish Detail'
        }} />
    </MenuNavigator.Navigator>
  );
}

function ContactNavigatorScreen() {
  const ContactNavigator = createStackNavigator();
  return (
    <ContactNavigator.Navigator initialRouteName='Contact'
    screenOptions={{
      headerStyle: { backgroundColor: '#7cc' },
      headerTintColor: '#fff',
      headerTitleStyle: { color: '#fff' }
    }}>
      <ContactNavigator.Screen name='Contact' component={Contact}
        options={({ navigation }) => ({
          headerTitle: 'Contact',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </ContactNavigator.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ backgroundColor: '#7cc', height: 80, alignItems: 'center', flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Image source={require('./images/logo.png')} style={{ margin: 10, width: 80, height: 60 }} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>TDK & Friends</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem label='Help'
        icon={({ focused, color, size }) => <Icon name='help' size={size} color={focused ? '#7cc' : '#ccc'} />}
        onPress={() => Linking.openURL('https://reactnavigation.org/docs/getting-started')} />
    </DrawerContentScrollView>
  );
}

function MainNavigatorScreen() {
  const MainNavigator = createDrawerNavigator();
  return (
    <MainNavigator.Navigator initialRouteName='HomeScreen' drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <MainNavigator.Screen name='HomeScreen' component={HomeNavigatorScreen}
        options={{
          title: 'Home', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='home' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='AboutScreen' component={AboutNavigatorScreen}
        options={{
          title: 'About Us', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='info' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='MenuScreen' component={MenuNavigatorScreen}
        options={{
          title: 'Menu', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='menu' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='ContactScreen' component={ContactNavigatorScreen}
        options={{
          title: 'Contact Us', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='contacts' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
    </MainNavigator.Navigator>
  );
}

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen />
      </NavigationContainer>
    );
  }
  componentDidMount() {
    // redux
    this.props.fetchLeaders();
  }
}
export default connect(null, mapDispatchToProps)(Main);