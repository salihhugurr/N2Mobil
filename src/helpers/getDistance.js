import { lineString as makeLineString} from '@turf/helpers';
import * as turf from "@turf/turf";

export const getDistance = (data) => {
    const dataLength = data.length;
    var line = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": data
                }
            }
        ]
    };

    var start = {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": data[0]
        }
    };
    var stop = {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": data[dataLength-1]
        }
    };

    var sliced = turf.lineSlice(start, stop, line.features[0]);
    var length = turf.lineDistance(sliced, 'kilometers');

    return length;
}