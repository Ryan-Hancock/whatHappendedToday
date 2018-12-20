import React, { Component } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import CardCarousel from "./components/CardCarousel";
import RefreshBtn from "./components/RefreshBtn";
import * as _ from "lodash";

import { getHistoryFromApi } from "./services/call";

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      history: {},
      birth: {},
      event: {},
      death: {}
    };
    
    this.setItems = this.setItems.bind(this)
  }

  componentDidMount() {
    this.getHistory();
  }

  getHistory() {
    getHistoryFromApi()
      .then(res => {
        console.log(res);
        this.setState({
          history: res,
        }, this.setItems);
      })
      .catch(err => {
        console.log(err);
      });
  }

  rand(obj) {
    return obj[Math.floor(Math.random() * obj.length)];
  }
  
  setItems() {
    let data = this.state.history.data
    let event = _.extend(
      {},
      { title: "Event", img: require("./assets/images/clock.jpg") },
      this.rand(data.Events)
    );
    let birth = _.extend(
      {},
      { title: "Birth", img: require("./assets/images/birthday.jpg") },
      this.rand(data.Births)
    );
    let death = _.extend(
      {},
      { title: "Death", img: require("./assets/images/skull.jpg") },
      this.rand(data.Deaths)
    );
    this.setState({
      event,
      birth,
      death
    });
  }

  render() {
    let itemList = [this.state.event, this.state.birth, this.state.death];

    return (
      <ImageBackground style={styles.container} source={require("./assets/images/background.jpeg")} style={{width: '100%', height: '100%'}}>
      
        <Text style={{ fontSize: 50, color: "#effdff", textAlign: "center" }}>{"Past Occurence"}</Text>
        <Text style={{ fontSize: 25, marginBottom: 12, color: "#effdff", textAlign: "center" }}>{this.state.history.date}</Text>
        <CardCarousel items={itemList} />
        <RefreshBtn onPress={this.setItems}></RefreshBtn>
      
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
