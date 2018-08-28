import ReactDOM from 'react-dom';

export default function getDistanceFromEnd(event): number {
  // from react-web's ListView
  const isVertical = !this.props.horizontal;
  const target = ReactDOM.findDOMNode(this._scrollComponent);
  const visibleLength = target[isVertical ? 'offsetHeight' : 'offsetWidth'];
  const contentLength = target[isVertical ? 'scrollHeight' : 'scrollWidth'];
  const offset = target[isVertical ? 'scrollTop' : 'scrollLeft'];
  return contentLength - visibleLength - offset;
}
