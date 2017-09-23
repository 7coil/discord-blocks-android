Blockly.JavaScript.console_log = (block) => {
	const value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
	const code = `console.log(${value_text});\n`;
	return code;
};

Blockly.JavaScript.eval = (block) => {
	const value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
	const code = `eval(${value_text});\n`;
	return code;
};

Blockly.JavaScript.mss_object = () => {
	const code = '{}';
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript.mss_object_set = (block) => {
	const value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
	const text_key = block.getFieldValue('key');
	const value_token = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
	const code = `${value_object}['${text_key.replace(/'/g, '\\\'')}'] = ${value_token};\n`;
	return code;
};

Blockly.JavaScript.mss_property_get = (block) => {
	const text_key = block.getFieldValue('key');
	const value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
	const code = `${value_object}['${text_key.replace(/'/g, '\\\'')}']`;
	return [code, Blockly.JavaScript.ORDER_NONE];
};
