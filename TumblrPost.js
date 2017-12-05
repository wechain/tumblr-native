import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default class TumblrPost extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { post } = this.props;
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: post.photos[0].original_size.url }}
          style={styles.image}
        />
      </View>
    );
  }

  renderItem = () => {};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  image: {
    width: 150,
    height: 100
  }
});
