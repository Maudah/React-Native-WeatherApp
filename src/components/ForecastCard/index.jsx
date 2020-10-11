import React, { Component } from 'react';
import { StyleSheet, View, Image, FlatList, Dimensions } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
export default class ForecastCard extends Component {

  _renderHeader() {
    var date = new Date(this.props.detail[0].dt * 1000);
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayOfWeek = days[date.getDay()]
    var deg = Math.round(this.props.detail[0].main.temp * 10) / 10;
    var image = { uri: "https://openweathermap.org/img/w/" + this.props.detail[parseInt(this.props.detail.length / 2)].weather[0].icon + ".png" }
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 15, paddingLeft: 5 }}>{dayOfWeek}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'white', paddingTop: 15, fontSize: 15 }}>{deg}&#176;</Text>
          <Image style={{ width: 50, height: 50 }} source={image} />
        </View>
      </View>
    )
  }
  _renderContent() {
    const windowWidth = Dimensions.get('window').width;
    const { content } = this.props;
    var date = new Date(content.sunrise * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    let sunrise = hours + ':' + minutes.substr(-2);
    var date = new Date(content.sunset * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    let sunset = hours + ':' + minutes.substr(-2);

    return (
      <View>
        <Divider style={{ backgroundColor: '#dfe6e9', marginVertical: 10 }} />
        <FlatList
          style={{ width: windowWidth * 0.9 }}
          horizontal
          pagingEnabled={true}
          key={item => item.dt_text}
          showsHorizontalScrollIndicator={false}
          data={this.props.detail}
          renderItem={this._renderWeatherList}
        />
        <Divider style={{ backgroundColor: '#dfe6e9', marginVertical: 10 }} />
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5, paddingHorizontal: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={{ uri: 'https://img.icons8.com/ios-filled/100/000000/wind.png' }} style={styles.icon} />
            <Text style={{ paddingHorizontal: 5, fontSize: 13, fontWeight: 500 }}> {content.wind.speed}, {content.wind.deg}&#176;</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image source={{ uri: 'https://img.icons8.com/metro/52/000000/sunset.png' }} style={styles.icon} />
            <Text style={{ paddingHorizontal: 5, fontSize: 13, fontWeight: 500 }}>{sunset}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image source={{ uri: 'https://img.icons8.com/metro/52/000000/sunrise.png' }} style={styles.icon} />
            <Text style={{ paddingHorizontal: 5, fontSize: 13, fontWeight: 500 }}>{sunrise}</Text>
          </View>
        </View>
      </View>);
  }
  _renderWeatherList(item) {
    let time;
    var date = new Date(item.item.dt * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    time = hours + ':' + minutes.substr(-2);
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 14, color: 'white' }}>{time}</Text>
        <Image style={styles.image} source={{ uri: "https://openweathermap.org/img/w/" + item.item.weather[0].icon + ".png" }} />
        <Text style={{ fontSize: 14, color: 'white' }}>{Math.round(item.item.main.temp * 10) / 10}&#176;</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.card}>
        <Collapse>
          <CollapseHeader>
            {this._renderHeader()}
          </CollapseHeader>
          <CollapseBody>
            {this._renderContent()}
          </CollapseBody>
        </Collapse>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
  },
  image: {
    width: 40,
    height: 40
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
});
