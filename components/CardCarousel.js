import React, { Component } from "react";
import { Dimensions, View, Text, StyleSheet, Linking } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import Carousel from "react-native-snap-carousel";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
const entryBorderRadius = 8;

class CardCarousel extends Component {
  _renderItem({ item, index }) {
    handleClick = e => {
      let link = item.links[0].link;
      Linking.canOpenURL(link).then(supported => {
        if (supported) {
          Linking.openURL(link);
        } else {
          console.log("Don't know how to open URI: " + link);
        }
      });
    };

    return (
      <Card
        title={item.title}
        titleStyle={{fontSize: 25}}
        image={item.img}
        containerStyle={{ borderRadius: 5 }}
      >
        <Text style={{ marginBottom: 10, fontSize: 18 }}>{item.text}</Text>
        <Button
          icon={<Icon name="code" color="#ffffff" />}
          backgroundColor="#03A9F4"
          buttonStyle={{
            borderRadius: 25,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title="Link"
          id={index}
          onPress={this.handleClick}
        />
      </Card>
    );
  }

  render() {
    return (
      <Carousel
        ref={c => {
          this._carousel = c;
        }}
        data={this.props.items}
        renderItem={this._renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: "center",
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
    minHeight: "90%"
  }
});

export default CardCarousel;
