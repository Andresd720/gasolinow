export interface PosicionGpsCoord {
    lat : number;
    lng : number;   
}

export interface GoogleGeocodeResponse {
    results: GoogleGeocodeResult[];
    status: string;
}

export interface GoogleGeocodeResult {
    geometry: {
        location: PosicionGpsCoord;
    };
}
