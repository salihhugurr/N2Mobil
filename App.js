import React from 'react';
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducers from "./src/redux";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";

const Stack = createNativeStackNavigator()
const App = () => {
  const store = createStore(reducers);
  return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={"Home"}>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Details" component={DetailsScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
  );
};

export default App;
