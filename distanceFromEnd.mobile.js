export default function getDistanceFromEnd(event): number {
  let {
    contentSize,
    contentInset,
    contentOffset,
    layoutMeasurement,
  } = event.nativeEvent;

  let contentLength;
  let trailingInset;
  let scrollOffset;
  let viewportLength;
  if (this.props.horizontal) {
    contentLength = contentSize.width;
    trailingInset = contentInset.right;
    scrollOffset = contentOffset.x;
    viewportLength = layoutMeasurement.width;
  } else {
    contentLength = contentSize.height;
    trailingInset = contentInset.bottom;
    scrollOffset = contentOffset.y;
    viewportLength = layoutMeasurement.height;
  }

  return contentLength + trailingInset - scrollOffset - viewportLength;
}
