import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {
    Text,
    View,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    StatusBar, TextInput, Keyboard
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {AppColor, BASE_URL, FONTS, STYLES} from "../constants";
import {ww,wh,getDistance} from "../helpers";
import {Divider, Icon} from "react-native-elements";
import FavIcon from "../assets/Icons/FavIcon";
import FavIconUnfilled from "../assets/Icons/FavIconUnfilled";
import {addFav, removeFav} from "../redux/action";
import SearchIcon from "../assets/Icons/SearchIcon";


const HomeScreen = () => {
    const navigation = useNavigation();
    const [masterList, setMasterList] = useState([]);
    const [search, setSearch] = useState([]);
    const [list, setList] = useState([]);
    const {favorites} = useSelector(state => state.favReducer);
    const dispatch = useDispatch();
    const addToFav = fav => dispatch(addFav(fav));
    const removeFromFav = fav => dispatch(removeFav(fav));

    const handleAddFav = fav => {
        addToFav(fav);
    };

    const handleRemoveFav = fav => {
        removeFromFav(fav);
    };

    const ifExists = fav => {
        console.log(favorites);
        if (favorites.filter(item => item.id === fav.id).length > 0) {
            return true;
        } else return false;
    };

    useEffect(() => {
        console.log("fav", favorites);
        getData();
    }, [])

    const getData = async () => {
        let response = await axios.get(BASE_URL)
        console.log(response.data[0].coordinates)
        setList(response.data);
        setMasterList(response.data)
    }

    const renderList = ({item, index}) => {
        let distance = getDistance(item.coordinates).toFixed(0);
        return (
            <TouchableOpacity style={STYLES.listWrapper} onPress={()=>navigation.navigate("Details",{list:item,distance})}>
                <TouchableOpacity style={STYLES.favButton} onPress={() => {
                    ifExists(item) ? handleRemoveFav(item) : handleAddFav(item)
                }}>
                    {
                        ifExists(item) ? <FavIcon color={AppColor}/> : <FavIconUnfilled color={AppColor}/>
                    }
                </TouchableOpacity>
                <View style={STYLES.listView}>
                    <View style={STYLES.leftSection}>
                        <Icon name={"map-marker-distance"} type={"material-community"} color={AppColor}/>
                        <Text style={STYLES.distance}>{distance + " m"}</Text>
                    </View>
                    <View style={STYLES.rightSection}>
                        <Text style={STYLES.title}>{item.title}</Text>
                        <Text style={STYLES.description}>{item.description}</Text>
                    </View>
                </View>
                <Divider/>
            </TouchableOpacity>
        )
    }

    const searchText = (text) => {
        if (text) {
            const newData = masterList.filter(
                function (item) {
                    const itemData = item.title
                        ? item.title.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                }
            );
            setList(newData)
            setSearch(text)
        } else {
            setList(masterList)
            setSearch(text)
        }
    };

    return (
        <SafeAreaView style={STYLES.container}>
            <StatusBar hidd/>
            <View style={STYLES.searchWrapper}>
                <SearchIcon color={AppColor}/>
                <TextInput
                    placeholder="Search..."
                    placeholderTextColor="#999"
                    style={STYLES.search}
                    returnKeyType={"search"}
                    onSubmitEditing={() => {
                        Keyboard.dismiss;
                    }}
                    onChangeText={searchText}
                    value={search}
                />
            </View>
            <FlatList
                contentContainerStyle={{marginTop:wh(.01)}}
                renderItem={renderList}
                data={list}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    )
}

export default HomeScreen
