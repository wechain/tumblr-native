import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import TumblrPost from "./TumblrPost";

export default class TumblrList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      posts,
      loading,
      refreshing,
      handleLoadMore,
      handleRefresh
    } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          renderItem={postItem => <TumblrPost post={postItem.item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={50}
          ListFooterComponent={this.renderFooter(loading)}
        />
      </View>
    );
  }

  renderFooter = loading => {
    if (!loading) return null;
    return <ActivityIndicator animating={true} size="large" />;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
