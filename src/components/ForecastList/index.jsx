import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import ForecastCard from '../ForecastCard';
import autoBind from 'react-autobind';

export default class ForecastList extends Component {
  constructor() {
    super();
    autoBind(this);
    this.state = {
      list: [],
      dataForContent: [],
    };
  }

  componentDidMount() {
    this.HoursListToDailyList();
  }
  HoursListToDailyList() {
    var dataForContent1 = {
      sunset: this.props.forecast.city.sunset,
      sunrise: this.props.forecast.city.sunrise,
      wind: this.props.forecast.list[0].wind,
    }
    var date = this.props.forecast.list[0].dt_txt;
    var res = date.substr(8, 2);
    var currentList = [];
    var result = [];

    this.props.forecast.list.map((item) => {
      if (res === item.dt_txt.substr(8, 2)) {
        currentList.push(item);
      } else {
        res = item.dt_txt.substr(8, 2);
        result.push(currentList);
        currentList = [];
      }
    });
    this.setState({ list: result, dataForContent: dataForContent1 });
  }
  render() {
    return (
      <View>
        {this.state && <FlatList data={this.state.list}
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          key={item => item.dt_text}
          renderItem={({ item }) => <ForecastCard detail={item} content={this.state.dataForContent}/>} />}
      </View>
    );
  }
}
