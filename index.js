export const useLayzLocationTrack = () => {
  const [position, setPosition] = React.useState();
  const [id, setId] = React.useState(-1);
  const [error, setError] = React.useState();

  const watchPosition = () => {
    var watchId = window.navigator.geolocation.watchPosition(
      (currentPosition) => {
        setPosition(currentPosition);
      },
      (error) => {
        if (error) setError(error);
      },
    );
    setId(watchId);
  };
  const stopWatch = () => {
    if (id !== -1) window.navigator.geolocation.clearWatch(id);
  };
  return [watchPosition, stopWatch, { position, error }];
};
export const useCurrentPosition = () => {
  const [result, setResult] = React.useState({
    loading: true,
    error: false,
  });
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (res) =>
        setResult({
          loading: false,
          error: false,
          myLocation: { lat: res.coords.latitude, lng: res.coords.longitude },
        }),
      (err) => setResult({ loading: false, error: true }),
    );
  }, []);
  return result;
};

export const useLocationTrack = () => {
  const [position, setPosition] = React.useState();
  const [error, setError] = React.useState();
  window.navigator.geolocation.watchPosition(
    (currentPosition) => {
      setPosition(currentPosition);
    },
    (error) => {
      if (error) setError(error);
    },
  );
  return { position, error };
};
export const useGeocode = (position, key) => {
  const [result, setResult] = React.useState({
    loading: true,
    error: false,
  });
  const uri = url.resolve(
    'https://maps.googleapis.com/maps/api/geocode/json?',
    `json?latlng=${position.lat},${position.lng}&key=${key}`,
  );
  React.useEffect(() => {
    fetch(uri)
      .then((responce) => responce.json())
      .then((value) => setResult({ loading: false, error: !!value, data: value }))
      .catch(() => setResult({ loading: false, data: undefined, error: true }));
  }, [uri]);
  return result;
};
