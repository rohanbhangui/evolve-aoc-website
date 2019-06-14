import React from 'react';

import './address-form.scss';

class AddressForm extends React.Component {
	constructor(props) {
    super(props);
  }

  render() {

    const { submitEventHandler } = this.props;

    return (
      <form id="AddressForm" onSubmit={ submitEventHandler() }>
      	<div className="field">
      		<label>
      			{ /*<span>Name: </span>*/ }<input required className="input" placeholder="Full Name *" type="text" name="fullName" />
      		</label>
      	</div>
      	<div className="field">
      		<label>
      			{ /*<span>Address #1: </span>*/ }<input required className="input" placeholder="Address #1 *" type="text" name="addressOne" />
      		</label>
      	</div>
      	<div className="field">
      		<label>
      			{ /*<span>Address #2: </span>*/ }<input className="input" placeholder="Address #2" type="text" name="addressTwo" />
      		</label>
      	</div>
      	<div className="field">
      		<label>
      			{ /*<span>City: </span>*/ }<input required className="input" placeholder="City *" type="text" name="city" />
      		</label>
      	</div>
      	<div className="field">
      		<label>
      			{ /*<span>State/Province: </span>*/ }<input required className="input" placeholder="State/Province *" type="text" name="region" />
      		</label>
      	</div>
      	<div className="field">
      		<label>
      			{ /*<span>Country: </span>*/ }<input required className="input" placeholder="Country *" type="text" name="country" />
      		</label>
      	</div>
      	<div className="field">
      		<label>
      			{ /*<span>Postal Code: </span>*/ }<input required className="input" placeholder="Postal Code *" type="text" name="postalCode" />
      		</label>
      	</div>
      	<input className="button primary" type="submit" value="Next"/>
      </form>
    )
  }
}


export default AddressForm;
