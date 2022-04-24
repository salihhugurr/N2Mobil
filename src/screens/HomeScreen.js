import React, {useEffect} from 'react';
import {useNavigation} from "@react-navigation/native";
import {Text, View} from "react-native";
import {useSelector} from "react-redux";
import axios from "axios";
import {BASE_URL} from "../constants";


const HomeScreen = () => {
    const navigation = useNavigation();
    const {GeneralResponse} = useSelector(state => state)

    useEffect(()=>{
        getData();
    },[])

    const getData = async () => {
        let response = await axios.get(BASE_URL)
        console.log("response",response.data)
    }
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text>
                {GeneralResponse.name}
            </Text>
        </View>
    )
}

export default HomeScreen