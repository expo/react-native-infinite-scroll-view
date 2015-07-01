# InfiniteScrollView

**NOTE:** don't try to use this until https://github.com/facebook/react-native/pull/785 is merged.

InfiniteScrollView is a React Native scroll view that notifies you as the scroll offset approaches the bottom. You can instruct it to display a loading indicator while you load more content. This is a common design in feeds. InfiniteScrollView also supports horizontal scroll views.

It conforms to [ScrollableMixin](https://github.com/exponentjs/react-native-scrollable-mixin) so you can compose it with other scrollable components.

[![npm package](https://nodei.co/npm/react-native-infinite-scroll-view.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-native-infinite-scroll-view/)

## Installation
```
npm install react-native-infinite-scroll-view
```

## Usage

Compose InfiniteScrollView with the scrollable component that you would like to get events from. In the case of a ListView, you would write:

```js
var React = require('react-native');
var InfiniteScrollView = require('react-native-infinite-scroll-view');
var {
  ListView,
} = React;

// Inside of a component's render() method:
render() {
  return (
    <ListView
      renderScrollComponent={props => <InfiniteScrollView {...props} />}
      dataSource={...}
      renderRow={...}
      canLoadMore={this.state.canLoadMoreContent}
      isLoadingMore={this.state.isLoadingContent}
    />
  );
}
```

**NOTE:** When inverting a ListView, you must create a ListView that delegates to an InvertibleScrollView as shown above and not the other way around. Otherwise it will not be able to invert the rows and the content will look upside down. This is true for any scroll view that adds its own children, not just ListView.

## Tips and Caveats

- Horizontal scroll views are supported
- Scroll views that specify their children (ex: ListViews) must delegate to InfiniteScrollView so that InfiniteScrollView can add the loading indicator to the list of children

## Implementation

InfiniteScrollView uses the `onScroll` event to continuously calculate how far the scroll offset is from the bottom.
