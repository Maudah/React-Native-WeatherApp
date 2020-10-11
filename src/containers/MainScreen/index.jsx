import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, Dimensions, ActivityIndicator, Image } from 'react-native';
import ForecastList from '../../components/ForecastList';
import AlertComponent from '../../components/Alert';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import autoBind from 'react-autobind';


export default class App extends Component {

  constructor() {
    super();
    autoBind(this);
    this.state = {
      loading: true,
      address: '',
      forecast: [],
      isOpen: false,
    };
  }
  componentDidMount() {
    this.getLocationAsync();
  }
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        isOpen: true,
      });
    }
    else {
      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
      const { latitude, longitude } = location.coords;

      let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' +
        latitude + '&lon=' + longitude + '&units=metric&appid=34026f1820a73bd0d6e38e6c9931d3e5';
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.setState({ forecast: data, address: data.city.name, loading: false, isOpen: false });
        });
    }
  };
  closeModal(){
    this.setState({isOpen: false})
  }
  render() {
    const { address, forecast, loading, isOpen} = this.state;
    var date = new Date();
    var hours = date.getHours();
    const imageURI = { uri: `https://cdn.dribbble.com/users/925716/screenshots/3333720/attachments/${hours > 4 || hours > 19 ? '722375/night.png' : '722376/after_noon.png'}` };
    const locatiovIconURI = { uri: 'https://www.iconsdb.com/icons/preview/white/worldwide-location-xxl.png' }
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.image} source={imageURI}>
        <AlertComponent isOpen={isOpen} title={'location permission is necessary'} stayTitle={'OK'} stayButton={this.getLocationAsync} leave={this.closeModal}/>
          <View style={styles.innerContainer}>
            {loading && <ActivityIndicator size="small" color="white" />}
            {!loading && <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Image style={{ width: 20, height: 20 }} source={locatiovIconURI} />
              <Text style={[styles.text, { paddingLeft: 5, paddingTop: 0 }]}>{address}</Text>
            </View>}
            {forecast.length !== 0 && <Text style={[styles.text, { fontWeight: '500', fontSize: 70, paddingBottom: 10 }]}>{Math.round(forecast.list[0].main.temp * 10) / 10}&#176;</Text>}
            {forecast.length !== 0&& <ForecastList forecast={forecast} />}
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const windowHighest = Dimensions.get('window').Highest;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  innerContainer: {
    display: 'flex',
    marginTop: 200,
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
    paddingVertical: 5,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
});

