import React from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import TumblrList from "./TumblrList";

const URL =
  "https://api.tumblr.com/v2/blog/pitchersandpoets.tumblr.com/posts/photo?api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4&limit=10";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      page: 0,
      loading: false,
      refreshing: false
    };
  }

  componentDidMount() {
    this.getPosts(this.state.page);
  }

  render() {
    return (
      <View style={styles.container}>
        <TumblrList
          posts={this.state.posts}
          loading={this.state.loading}
          refreshing={this.state.refreshing}
          handleLoadMore={this.loadMore}
          handleRefresh={this.refresh}
        />
      </View>
    );
  }

  loadMore = () => {
    console.log("load moere");
    this.getPosts(this.state.page + 1);
  };

  refresh = () => {
    console.log("refresh");
    this.setState({ refreshing: true, page: 0 }, () => {
      this.getPosts(this.state.page);
    });
  };

  getPosts(page) {
    console.log(page);
    this.setState({ loading: true }, () => {
      const url = `${URL}&offset=${page * 10}`;
      fetch(url)
        .then(response => response.json())
        .then(responseJson => {
          const data = responseJson.response.posts;
          this.setState({
            posts: this.state.refreshing
              ? data
              : [...this.state.posts, ...data],
            page: page,
            loanding: false,
            refreshing: false
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
