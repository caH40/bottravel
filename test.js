session = {
	airport: '---',
	resort: '-j--',
	month: 'asd',
	persons: '-d--',
	nigths: '---'
}

// console.log('nigths' in session)
let x
const keys = Object.keys(session);
keys.forEach(element => {
	// console.log(session[element]);
	if (session[element] === '---') {
		x = false
	} else {
		x = true
	}
})
console.log(x)