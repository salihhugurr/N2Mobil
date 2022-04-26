import React from 'react';
import {Provider} from "react-redux";
import {createStore} from "redux";
import {store,persistor} from "./src/redux/store";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";


const Stack = createNativeStackNavigator()
const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName={"Home"} screenOptions={{headerShown: false}}>
                        <Stack.Screen name="Home" component={HomeScreen}/>
                        <Stack.Screen name="Details" component={DetailsScreen}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
};

export default App;
