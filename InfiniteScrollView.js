'use strict';

let React = require('react-native');
let ScrollableMixin = require('react-native-scrollable-mixin');
let {
  PropTypes,
  ScrollView,
  View,
} = React;

let cloneReferencedElement = require('react-native-clone-referenced-element');

let DefaultLoadingIndicator = require('./DefaultLoadingIndicator');

class InfiniteScrollView extends React.Component {
  static propTypes = {
    ...ScrollView.propTypes,
    distanceToLoadMore: PropTypes.number.isRequired,
    canLoadMore: PropTypes.bool.isRequired,
    isLoadingMore: PropTypes.bool.isRequired,
    onLoadError: PropTypes.func,
    onLoadMoreAsync: PropTypes.func.isRequired,
    renderLoadingIndicator: PropTypes.func.isRequired,
    renderLoadingErrorIndicator: PropTypes.func.isRequired,
  };

  static defaultProps = {
    distanceToLoadMore: 1500,
    canLoadMore: false,
    isLoadingMore: false,
    scrollEventThrottle: 100,
    renderLoadingIndicator: () => <DefaultLoadingIndicator />,
    renderLoadingErrorIndicator: () => <View />,
    renderScrollComponent: props => <ScrollView {...props} />,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      isDisplayingError: false,
    };
  }

  getScrollResponder(): ReactComponent {
    return this._scrollComponent.getScrollResponder();
  }

  setNativeProps(nativeProps) {
    this._scrollComponent.setNativeProps(nativeProps);
  }

  render() {
    let statusIndicator;

    if (this.state.isDisplayingError) {
      statusIndicator = React.cloneElement(
        this.props.renderLoadingErrorIndicator(this._retryOnLoadMore.bind(this)),
        { key: 'loading-error-indicator' },
      );
    } else if (this.props.canLoadMore) {
      statusIndicator = React.cloneElement(
        this.props.renderLoadingIndicator(),
        { key: 'loading-indicator' },
      );
    }

    let {
      renderScrollComponent,
      ...props,
    } = this.props;
    Object.assign(props, {
      onScroll: this._handleScroll.bind(this),
      children: [this.props.children, statusIndicator],
    });

    return cloneReferencedElement(renderScrollComponent(props), {
      ref: component => { this._scrollComponent = component; },
    });
  }

  _handleScroll(event) {
    if (this.props.onScroll) {
      this.props.onScroll(event);
    }

    if (this.props.isLoadingMore || !this.props.canLoadMore) {
      return;
    }

    if (this._distanceFromEnd(event) < this.props.distanceToLoadMore) {
      this._onLoadMore();
    }
  }

  _onLoadMore() {
    this.props.onLoadMoreAsync().catch(error => {
      this.props.onLoadError && this.props.onLoadError(error);
      this.setState({isDisplayingError: true});
    });
  }

  _retryOnLoadMore() {
    this.setState({isDisplayingError: false});
    this._onLoadMore();
  }

  _distanceFromEnd(event): number {
    let {
      contentSize,
      contentInset,
      contentOffset,
      layoutMeasurement,
    } = event.nativeEvent;

    if (this.props.horizontal) {
      var contentLength = contentSize.width;
      var trailingInset = contentInset.right;
      var scrollOffset = contentOffset.x;
      var viewportLength = layoutMeasurement.width;
    } else {
      contentLength = contentSize.height;
      trailingInset = contentInset.bottom;
      scrollOffset = contentOffset.y;
      viewportLength = layoutMeasurement.height;
    }

    return contentLength + trailingInset - scrollOffset - viewportLength;
  }
}

Object.assign(InfiniteScrollView.prototype, ScrollableMixin);

module.exports = InfiniteScrollView;
