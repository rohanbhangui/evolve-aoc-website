
import React from 'react';

import './size-selector.scss';

export class SizeSelector extends React.Component {
  render() {

    return (
      <div className="size-selector">
        <label><input name="size-selector" type="radio" value="s"/><span>S</span></label>
        <label><input name="size-selector" type="radio" value="m"/><span>M</span></label>
        <label><input name="size-selector" type="radio" value="l"/><span>L</span></label>
        <label><input name="size-selector" type="radio" value="xl"/><span>XL</span></label>
        <label><input name="size-selector" type="radio" value="xxl"/><span>2XL</span></label>
      </div>
    )
  }
}

