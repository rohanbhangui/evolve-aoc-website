export const totalCart = (cart) => {
	const total = cart
	.map(item => item.qty*item.price)
	.reduce((acc, cur) => acc + cur);

	return total.toFixed(2);
}