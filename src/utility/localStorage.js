export const loadCart = () => {
	try {
		const serializedCart = localStorage.getItem('cart');

		if(serializedCart === null) {
			return undefined;
		}

		return JSON.parse(serializedCart);
	} catch (err) {
		return undefined;
	}
}

export const saveCart = (state) => {
	try {
		const serializedCart = JSON.stringify(state);
		localStorage.setItem('cart', serializedCart);
	} catch(err) {
		
	}
}