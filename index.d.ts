export = GoogleMapHook;
export as namespace GoogleMapHook;
declare namespace GoogleMapHook {
  function useLayzLocationTrack(): [
    () => void,
    () => void,
    {
      position: Position | undefined;
      error: PositionError | undefined;
    },
  ];
  function useLocationTrack(): {
    position: Position | undefined;
    error: PositionError | undefined;
  };
  function useCurrentPosition(): {
    loading: boolean;
    myLocation?: google.maps.LatLngLiteral;
    error: boolean;
  };
  interface Geocode {
    plus_code: {
      compound_code: string;
      global_code: string;
    };
    results: { formatted_address: string }[];
  }
  function useGeocode(
    position: google.maps.LatLngLiteral,
    key: string,
  ): {
    loading: boolean;
    data?: Geocode;
    error: boolean;
  };
}
