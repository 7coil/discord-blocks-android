const cons = document.getElementById("console");

const log = (string) => {
	if (cons.childNodes.length > 1000) {
		cons.removeChild(cons.childNodes[0])
	}
	const para = document.createElement('code');
	const node = document.createTextNode(string);

	para.appendChild(node);
	cons.appendChild(para);
};

if (typeof blockly !== 'undefined') {
	try {
		eval(blockly.getJS());
	} catch (e) {
		log(e);
	}
} else {
	log('Blockly not found!');
}
