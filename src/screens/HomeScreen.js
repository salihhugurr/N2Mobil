import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    ImageBackground,
    SafeAreaView,
    TouchableOpacity,
    StatusBar, TextInput, Keyboard
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {AppColor, BASE_URL, FONTS} from "../constants";
import {CustomHeader} from "../components/CustomHeader";
import {ww,wh,getDistance} from "../helpers";
import {Divider, Icon} from "react-native-elements";
import FavIcon from "../assets/Icons/FavIcon";
import FavIconUnfilled from "../assets/Icons/FavIconUnfilled";
import {addFav, AddFav, removeFav} from "../redux/action";
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
        return (
            <TouchableOpacity style={styles.listWrapper}>
                <TouchableOpacity style={styles.favButton} onPress={() => {
                    ifExists(item) ? handleRemoveFav(item) : handleAddFav(item)
                }}>
                    {
                        ifExists(item) ? <FavIcon color={AppColor}/> : <FavIconUnfilled color={AppColor}/>
                    }
                </TouchableOpacity>
                <View style={styles.listView}>
                    <View style={styles.leftSection}>
                        <Icon name={"map-marker-distance"} type={"material-community"} color={AppColor}/>
                        <Text style={styles.distance}>{getDistance(item.coordinates).toFixed(2) + " km"}</Text>
                    </View>
                    <View style={styles.rightSection}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
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
        <SafeAreaView style={styles.container}>
            <StatusBar hidd/>
            <View style={styles.searchWrapper}>
                <SearchIcon color={AppColor}/>
                <TextInput
                    placeholder="Search..."
                    placeholderTextColor="#999"
                    style={styles.search}
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#FEFEFE"
    },
    listWrapper: {
        width: ww(),
        height: ww(.3),
        position: "relative",
    },
    listView: {
        flexDirection: "row",
        flex: 1,
        paddingHorizontal: ww(.02)
    },
    leftSection: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: ww(.04),
        borderRightWidth: 1,
        borderColor: "#afafaf"
    },
    rightSection: {
        padding: ww(.02),
        paddingHorizontal: ww(.04),
        flex: 1
    },
    title: {
        fontFamily: FONTS.bold,
        color: "#444",
        fontSize: ww(.045)
    },
    description: {
        fontFamily: FONTS.semi,
        color: "#444",
        fontSize: ww(.035)
    },
    favButton: {
        position: "absolute",
        right: ww(.03),
        bottom: ww(.02),
        zIndex: 2,
    },
    distance: {
        fontFamily: FONTS.semi,
        color: "#666",
        fontSize: ww(.04)
    },
    searchWrapper: {
        marginTop: wh(0.01),
        marginBottom: wh(0.01),
        flexDirection: 'row',
        backgroundColor: '#FEFEFE',
        width: '97%',
        height: wh(0.05),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '3%',
        borderRadius: 10,
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.66,
        shadowRadius: 2.0,
        elevation: 2,
    },
    search: {
        paddingLeft: '3%',
        width: ww(0.8),
        height: '100%',
    },
})