import React from 'react'
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const RefreshBtn = ({ onPress }) => (
  <Button
    onPress={onPress}
    icon={<Icon name="refresh" size={35} color={"#FFFFFF"} style={{
        opacity: 0.2,
        padding: 7
    }} />}
    clear={true}
    title={""}
  />
);

export default RefreshBtn;
