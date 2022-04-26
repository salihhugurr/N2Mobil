import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "redux";

export const saveState = async (value) => {
    console.log("value ne geldi",value)
    const serializedState = await AsyncStorage.getItem(KEY);
    let parsedState = JSON.parse(serializedState);
    console.log("object ne geldi",parsedState)
    parsedState[value.id] = value.fav
    const jsonValue = JSON.stringify(parsedState)
    try {
        await AsyncStorage.setItem(KEY, jsonValue)
    } catch (e) {
        // saving error
    }
}