import React from 'react';

import './size-selector.scss';

export class SizeSelector extends React.Component {
  render() {

    const { selectedSizeHandler, selectedSize, id, sizeRequiredError, inventoryCounts } = this.props;

    return (
      <div className="size-selector">
        <h6 className={`${ sizeRequiredError ? 'error-active' : ''}`}>Select Size<sup>*</sup></h6>
        <div className={`label-group ${ sizeRequiredError ? 'error-active' : ''}`}>
          <label className={`${inventoryCounts.s === 0 ? 'disabled' : '' }`}><input name={ `size-selector-${id}`} checked={ selectedSize==="S"} disabled={inventoryCounts.s === 0} type="radio" onChange={ selectedSizeHandler('S') } defaultValue="S"/><span>S</span></label>
          <label className={`${inventoryCounts.m === 0 ? 'disabled' : '' }`}><input name={ `size-selector-${id}`} checked={ selectedSize==="M"} disabled={inventoryCounts.m === 0} type="radio" onChange={ selectedSizeHandler('M') } defaultValue="M"/><span>M</span></label>
          <label className={`${inventoryCounts.l === 0 ? 'disabled' : '' }`}><input name={ `size-selector-${id}`} checked={ selectedSize==="L"} disabled={inventoryCounts.l === 0} type="radio" onChange={ selectedSizeHandler('L') } defaultValue="L"/><span>L</span></label>
          <label className={`${inventoryCounts.xl === 0 ? 'disabled' : '' }`}><input name={ `size-selector-${id}`} checked={ selectedSize==="XL"} disabled={inventoryCounts.xl === 0} type="radio" onChange={ selectedSizeHandler('XL') } defaultValue="XL"/><span>XL</span></label>
          <label className={`${inventoryCounts.xxl === 0 ? 'disabled' : '' }`}><input name={ `size-selector-${id}`} checked={ selectedSize==="2XL"} disabled={inventoryCounts.xxl === 0} type="radio" onChange={ selectedSizeHandler('2XL') } defaultValue="2XL"/><span>2XL</span></label>
        </div>
      </div>
    )
  }
}

