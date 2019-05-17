import React from 'react';

import './variant-selector.scss';

export class VariantSelector extends React.Component {
	constructor(props) {
    super(props);
  }

  render() {
    let { variants, selectedVariantHandler, selectedVariantId } = this.props;

    return (
      <div>
        { variants.map((variant, index) =>
          <div className={`variant ${ variant.variantId === selectedVariantId ? 'active' : ''}`} key={ index } onClick={ selectedVariantHandler(variant.variantId) } style={{backgroundColor: variant.color.value}}>

          </div>
        )}
      </div>
    )
  }
}

