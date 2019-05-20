
import React from 'react';

import './size-selector.scss';

export class SizeSelector extends React.Component {
  render() {

    const { selectedSizeHandler, selectedSize } = this.props;

    return (
      <div className="size-selector">
        <label><input name="size-selector" defaultChecked="checked" type="radio" onClick={ selectedSizeHandler('S') } defaultValue="S"/><span>S</span></label>
        <label><input name="size-selector" type="radio" onClick={ selectedSizeHandler('M') } defaultValue="M"/><span>M</span></label>
        <label><input name="size-selector" type="radio" onClick={ selectedSizeHandler('L') } defaultValue="L"/><span>L</span></label>
        <label><input name="size-selector" type="radio" onClick={ selectedSizeHandler('XL') } defaultValue="XL"/><span>XL</span></label>
        <label><input name="size-selector" type="radio" onClick={ selectedSizeHandler('2XL') } defaultValue="2XL"/><span>2XL</span></label>
      </div>
    )
  }
}

