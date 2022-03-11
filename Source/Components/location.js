import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

const location = () => {
  if (hasLocationPermission) {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  const Hyderabad = {
    lat: 17.385044,
    lng: 78.486671,
  };

  const position = async () => {
    await Geocoder.geocodePosition(Hyderabad)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    position();
  }, []);

  const address = async () => {
    setIndicator(true);
    await Geocoder.geocodeAddress('Kacheguda')
      .then(res => {
        const add = res;
        setLocation(add);
        console.log(res);
      })
      .catch(err => console.log(err));
    setIndicator(false);
  };

  useEffect(() => {
    address();
  }, []);
};
