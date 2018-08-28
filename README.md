# InfiniteScrollView [![CircleCI](https://circleci.com/gh/expo/react-native-infinite-scroll-view.svg?style=svg)](https://circleci.com/gh/expo/react-native-infinite-scroll-view)

InfiniteScrollView is a React Native scroll view that notifies you as the scroll offset approaches the bottom. You can instruct it to display a loading indicator while you load more content. This is a common design in feeds. InfiniteScrollView also supports horizontal scroll views.

It conforms to [ScrollableMixin](https://github.com/expo/react-native-scrollable-mixin) so you can compose it with other scrollable components.

[![npm package](https://nodei.co/npm/react-native-infinite-scroll-view.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-native-infinite-scroll-view/)

## Installation

```sh
npm install --save react-native-infinite-scroll-view
```

## Usage

Compose InfiniteScrollView with the scrollable component that you would like to get events from. In the case of a basic ListView, you would write:

```js
import React from 'react';
import {
  ListView,
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

class ExampleComponent extends React.Component {
  _loadMoreContentAsync = async () => {
    // Fetch more data here.
    // After fetching data, you should update your ListView data source
    // manually.
    // This function does not have a return value.
  }

  render() {
    return (
      <ListView
        renderScrollComponent={props => <InfiniteScrollView {...props} />}
        dataSource={...}
        renderRow={...}
        canLoadMore={this.state.canLoadMoreContent}
        onLoadMoreAsync={this._loadMoreContentAsync}
      />
    );
  }
}
```

A more complete example that uses a `ListView.DataSource`, [react-redux](https://github.com/reactjs/react-redux), and supports pagination would look something like this:

```js
import React from 'react';
import {
  ListView,
  RefreshControl,
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import { connect } from 'react-redux';

class ExampleComponent extends React.Component {
  static propTypes = {
    // Assume data shape looks like:
    // {items: ["item1", "item2"], nextUrl: null, isFetching: false}
    listData: PropTypes.object.isRequired,

    // dispatch is automatically provided by react-redux, and is used to
    // interact with the store.
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: this._rowHasChanged.bind(this),
      }),
    };

    // Update the data store with initial data.
    this.state.dataSource = this.getUpdatedDataStore(props);
  }

  async componentWillMount() {
    // Initial fetch for data, assuming that listData is not yet populated.
    this._loadMoreContentAsync();
  }

  componentWillReceiveProps(nextProps) {
    // Trigger a re-render when receiving new props (when redux has more data).
    this.setState({
      dataSource: this.getUpdatedDataSource(nextProps),
    });
  }

  getUpdatedDataSource(props) {
    // See the ListView.DataSource documentation for more information on
    // how to properly structure your data depending on your use case.
    let rows = props.listData.items;

    let ids = rows.map((obj, index) => index);

    return this.state.dataSource.cloneWithRows(rows, ids);
  }

  _rowHasChanged(r1, r2) {
    // You might want to use a different comparison mechanism for performance.
    return JSON.stringify(r1) !== JSON.stringify(r2);
  }

  _renderRefreshControl() {
    // Reload all data
    return (
      <RefreshControl
        refreshing={this.props.listData.isFetching}
        onRefresh={this._loadMoreContentAsync.bind(this)}
      />
    );
  }

  _loadMoreContentAsync = async () => {
    // In this example, we're assuming cursor-based pagination, where any
    // additional data can be accessed at this.props.listData.nextUrl.
    //
    // If nextUrl is set, that means there is more data. If nextUrl is unset,
    // then there is no existing data, and you should fetch from scratch.
    this.props.dispatch(fetchMoreContent(this.props.listData.nextUrl));
  }

  render() {
    return (
      <ListView
        renderScrollComponent={props => <InfiniteScrollView {...props} />}
        dataSource={this.state.dataSource}
        renderRow={...}
        refreshControl={this._renderRefreshControl()}
        canLoadMore={!!this.props.listData.nextUrl}
        onLoadMoreAsync={this._loadMoreContentAsync.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {listData: state.listData};
};

export default connect(mapStateToProps)(ExampleComponent);
```

## Tips and Caveats

- Horizontal scroll views are supported
- When you load more content in an infinite ListView, the ListView by default will render only one row per frame. This means that for a short amount of time after loading new content, the user could still be very close to the bottom of the scroll view and may trigger a second load.
- Known issue: Make sure your initial data reaches the bottom of the screen, otherwise scroll events won't trigger. Subsequent loads are not affected. See [expo/react-native-infinite-scroll-view#9](https://github.com/expo/react-native-infinite-scroll-view/issues/9) for more details.

## Implementation

InfiniteScrollView uses the `onScroll` event to continuously calculate how far the scroll offset is from the bottom.
