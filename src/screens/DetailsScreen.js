import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {Text, View} from "react-native";


const DetailsScreen = () => {
    const navigation = useNavigation();

    return(
        <View style={{flex:1}}>
            <Text>
                Details
            </Text>
        </View>
    )
}


export default DetailsScreen;