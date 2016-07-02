# InfiniteScrollView [![Slack](http://slack.exponentjs.com/badge.svg)](http://slack.exponentjs.com)

InfiniteScrollView is a React Native scroll view that notifies you as the scroll offset approaches the bottom. You can instruct it to display a loading indicator while you load more content. This is a common design in feeds. InfiniteScrollView also supports horizontal scroll views.

It conforms to [ScrollableMixin](https://github.com/exponentjs/react-native-scrollable-mixin) so you can compose it with other scrollable components.

[![npm package](https://nodei.co/npm/react-native-infinite-scroll-view.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-native-infinite-scroll-view/)

## Installation

```sh
npm install --save react-native-infinite-scroll-view
```

## Usage

Compose InfiniteScrollView with the scrollable component that you would like to get events from. In the case of a ListView, you would write:

```js
import React from 'react';
import {
  ListView,
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';


// Inside of a component's render() method:
render() {
  return (
    <ListView
      renderScrollComponent={props => <InfiniteScrollView {...props} />}
      dataSource={...}
      renderRow={...}
      canLoadMore={this.state.canLoadMoreContent}
      onLoadMoreAsync={this._loadMoreContentAsync()}
    />
  );
}
```

## Tips and Caveats

- Horizontal scroll views are supported
- When you load more content in an infinite ListView, the ListView by default will render only one row per frame. This means that for a short amount of time after loading new content, the user could still be very close to the bottom of the scroll view and may trigger a second load.

## Implementation

InfiniteScrollView uses the `onScroll` event to continuously calculate how far the scroll offset is from the bottom.
