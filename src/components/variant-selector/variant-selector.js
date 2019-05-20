import React from 'react';

import './variant-selector.scss';

export class VariantSelector extends React.Component {
  render() {
    let { variants, selectedVariantHandler, selectedVariantId } = this.props;

    return (
      <div id="variants">
        <h6>Select Color</h6>
        { variants && variants.map((variant, index) =>
          <div className={`variant ${ variant.variantId === selectedVariantId ? 'active' : ''}`} key={ index } onClick={ selectedVariantHandler(variant.variantId) } style={{backgroundColor: variant.color.value}}>
          
          </div>
        )}
      </div>
    )
  }
}

