export const PROJECT_NAME = 'Evolve AOC';

export const SIZE_MAPPING = {
  S: 'Small',
  M: 'Medium',
  L: 'Large',
  XL: 'X-Large',
  XXL: 'XX-Large'
};

export const SHIPPING_STATUS = {
	received: "Received",
	confirmed: "Confirmed",
	processing: "Processing",
	shipping: "Shipping",
	shipped: "Shipped"
}

export const SELECT_STYLES = {
	control: (base, state) => ({
	  ...base,
	  padding: '.4rem',
	  boxShadow: "none",
	  fontFamily: `'aktiv-grotesk', Nimbus Sans, 'nimbus-sans', 'Helvetica Neue', Helvetica, Arial, sans-serif`,
	  fontSize: '13px',
	  letterSpacing: '1px',
	  borderRadius: '.25rem',
	  borderColor: state.isFocused ? 'black' : '#ccc',
	  '&:hover': {
	  	borderColor: state.isFocused ? 'black' : '#ccc'
	  },
	})
}