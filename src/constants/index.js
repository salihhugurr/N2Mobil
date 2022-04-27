import {StyleSheet} from "react-native";
import {wh, ww} from "../helpers";

export const BASE_URL = 'https://625fa7a992df0bc0f337dae4.mockapi.io/trips';
export const AppColor = '#6C7BFB'
export const FONTS = {
    bold:"SourceSansPro-Bold",
    semi:"SourceSansPro-SemiBold",
    regular:"SourceSansPro-Regular",
}
export const GOOGLE_API_KEY = "AIzaSyA85xXbAsPJPJ-ZeWBx4qIve6wlDeeHcuI"

export const STYLES = StyleSheet.create({
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
    backBox: {
        position: 'absolute',
        marginTop: wh(.05),
        flexDirection: "row",
        backgroundColor: '#fff',
        width: ww(.11),
        height: ww(.11),
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'flex-start',
        left: ww(.08),
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 10,
        shadowColor: '#ccc',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
        zIndex: 2,
    },
    favBox: {
        position: 'absolute',
        marginTop: wh(.05),
        flexDirection: "row",
        backgroundColor: '#fff',
        width: ww(.11),
        height: ww(.11),
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'flex-start',
        right: ww(.08),
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 10,
        shadowColor: '#ccc',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
        zIndex: 2,
    },
    centerView: {
        position: 'absolute',
        marginTop: wh(.05),
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 10,
        shadowColor: '#ccc',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
        zIndex: 2,
    },
})