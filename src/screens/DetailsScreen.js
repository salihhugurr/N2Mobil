import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {ActivityIndicator, StatusBar, Text, TouchableOpacity, View,StyleSheet} from "react-native";
import MapViewDirections from "react-native-maps-directions"
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Icon} from "react-native-elements";
import {AppColor, GOOGLE_API_KEY, STYLES} from "../constants";
import FavIcon from "../assets/Icons/FavIcon";
import FavIconUnfilled from "../assets/Icons/FavIconUnfilled";
import {useDispatch, useSelector} from "react-redux";
import {addFav, removeFav} from "../redux/action";
import {ww} from "../helpers";

const DetailsScreen = ({route}) => {
    const {list, distance} = route.params;
    const navigation = useNavigation();
    const [destinations, setDestinations] = useState([]);
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
        let arr = [];
        list.coordinates.map((item) => {
            arr.push({latitude: item[1], longitude: item[0]})
        })
        setDestinations(arr);
    }, [])


    useEffect(() => {
        if (destinations.length > 0) {
            console.log("dest", destinations[0].latitude)
            console.log("dest", destinations[0].longitude)
        }
    }, [destinations])

    return (
        <View style={{flex: 1}}>
            <StatusBar hidden/>
            <TouchableOpacity style={STYLES.backBox} onPress={() => navigation.goBack()}>
                <Icon name={"arrow-back-outline"} type={"ionicon"}/>
            </TouchableOpacity>
            <TouchableOpacity style={[STYLES.favBox]} onPress={() => {
                ifExists(list) ? handleRemoveFav(list) : handleAddFav(list)
            }}>
                {
                    ifExists(list) ? <FavIcon color={AppColor}/> : <FavIconUnfilled color={AppColor}/>
                }
            </TouchableOpacity>

            <View style={STYLES.centerView}>
                <Text style={STYLES.title}>{list.title}</Text>
            </View>
            <View style={{flex: 1}}>
                {
                    destinations.length === 0 ?
                        <View style={[StyleSheet.absoluteFillObject, {justifyContent: "center", alignItems: "center"}]}>
                            <ActivityIndicator/>
                        </View> :
                        <MapView
                            style={{flex: 1}}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={{
                                latitude: destinations[0].latitude,
                                longitude: destinations[0].longitude,
                                latitudeDelta: 0.01864195044303443,
                                longitudeDelta: 0.040142817690068,
                            }}
                        >
                            {
                                destinations.map((marker) => (
                                    <Marker coordinate={{
                                        latitude: marker.latitude,
                                        longitude: marker.longitude
                                    }}/>
                                ))
                            }
                            <MapViewDirections
                                origin={destinations[0]}
                                destination={destinations[destinations.length - 1]}
                                waypoints={destinations}
                                apikey={GOOGLE_API_KEY}
                                strokeWidth={8}
                                strokeColor={AppColor}
                            />
                        </MapView>
                }
            </View>
            <View style={STYLES.listWrapper}>
                <View style={STYLES.listView}>
                    <View style={STYLES.leftSection}>
                        <Icon name={"map-marker-distance"} type={"material-community"} color={AppColor}/>
                        <Text style={STYLES.distance}>{distance + " m"}</Text>
                    </View>
                    <View style={STYLES.rightSection}>
                        <Text style={[STYLES.description,{fontSize:ww(.04)}]}>{list.description}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}



export default DetailsScreen;