import React, { Component } from 'react'
import Select from 'react-select';

import { SELECT_STYLES } from '../../utility/variables';

import './address-form.scss';

class AddressForm extends React.Component {
	constructor(props) {
    super(props);
  }

  render() {

    const { submitEventHandler } = this.props;

    const PROVINCES = [
      { label: 'Alberta', value: 'alberta'},
      { label: 'British Columbia', value: 'british_columbia'},
      { label: 'Manitoba', value: 'manitoba'},
      { label: 'New Brunswick', value: 'new_brunswick'},
      { label: 'Newfoundland and Labrador', value: 'newfoundland_and_labrador'},
      { label: 'Nova Scotia', value: 'nova_scotia'},
      { label: 'Ontario', value: 'ontario'},
      { label: 'Prince Edward Island', value: 'prince_edward_island'},
      { label: 'Northwest Territories', value: 'northwest-territories'},
      { label: 'Nunavut', value: 'nunavut'},
      { label: 'Yukon', value: 'yukon'} 
    ];

    const COUNTRIES = [
      { label: 'Canada', value: 'CA'}
    ];

    return (
      <form id="AddressForm" onSubmit={ submitEventHandler() }>
      	<div className="field">
      		<label>
            <input required className="input" placeholder="Full Name *" type="text" name="fullName" />
      		</label>
      	</div>
      	<div className="field">
      		<label>
            <input required className="input" placeholder="Address #1 *" type="text" name="addressOne" />
      		</label>
      	</div>
      	<div className="field">
      		<label>
            <input className="input" placeholder="Address #2" type="text" name="addressTwo" />
      		</label>
      	</div>
      	<div className="field">
      		<label>
            <input required className="input" placeholder="City *" type="text" name="city" />
      		</label>
      	</div>
      	<div className="field">
          <label>
            <Select options={PROVINCES}
              isClearable={true}
              isDisabled={false}
              isLoading={false}
              isRtl={false}
              isSearchable={true}
              styles={SELECT_STYLES}
              name="region"
              placeholder="Province/State"
            />
          </label>
      	</div>
      	<div className="field">
          <label>
            <Select options={COUNTRIES}
              isClearable={true}
              isDisabled={false}
              isLoading={false}
              isRtl={false}
              isSearchable={true}
              styles={SELECT_STYLES}
              name="country"
              placeholder="Country"
            />
          </label>
      	</div>
      	<div className="field">
      		<label>
            <input required className="input" placeholder="Postal Code *" type="text" name="postalCode" maxLength="10" pattern="[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]" />
      		</label>
      	</div>
      	<input className="button primary" type="submit" value="Next"/>
      </form>
    )
  }
}


export default AddressForm;
