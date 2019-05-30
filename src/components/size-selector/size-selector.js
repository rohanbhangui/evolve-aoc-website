import React from 'react';

import './size-selector.scss';

export class SizeSelector extends React.Component {
  render() {

    const { selectedSizeHandler, selectedSize, id, sizeRequiredError, inventoryCounts } = this.props;

    return (
      <div className="size-selector">
        <h6 className={`${ sizeRequiredError ? 'error-active' : ''}`}>Select Size<sup>*</sup></h6>
        <div className={`label-group ${ sizeRequiredError ? 'error-active' : ''}`}>
          <label className={`${inventoryCount['s']}`}><input name={ `size-selector-${id}`} defaultChecked={ selectedSize==="S"} type="radio" onClick={ selectedSizeHandler('S') } defaultValue="S"/><span>S</span></label>
          <label className={`${inventoryCount['m']}`}><input name={ `size-selector-${id}`} defaultChecked={ selectedSize==="M"} type="radio" onClick={ selectedSizeHandler('M') } defaultValue="M"/><span>M</span></label>
          <label className={`${inventoryCount['l']}`}><input name={ `size-selector-${id}`} defaultChecked={ selectedSize==="L"} type="radio" onClick={ selectedSizeHandler('L') } defaultValue="L"/><span>L</span></label>
          <label className={`${inventoryCount['xl']}`}><input name={ `size-selector-${id}`} defaultChecked={ selectedSize==="XL"} type="radio" onClick={ selectedSizeHandler('XL') } defaultValue="XL"/><span>XL</span></label>
          <label className={`${inventoryCount['xxl']}`}><input name={ `size-selector-${id}`} defaultChecked={ selectedSize==="2XL"} type="radio" onClick={ selectedSizeHandler('2XL') } defaultValue="2XL"/><span>2XL</span></label>
        </div>
      </div>
    )
  }
}

