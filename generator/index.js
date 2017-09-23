// Things required for this to work
const documentation = require('./discord.js.json');
const js2xmlparser = require('js2xmlparser');
const uglify = require('uglify-es');
const fs = require('fs');

// Configuration
const url = 'https://discord.js.org/#/docs/main/stable/';
const colour = {
	construct: 160,
	prop: 230,
	method: 40,
	event: 100
};

const header =
`// This file was automatically generated.
// DO NOT EDIT
// Copyright Moustacheminer Server Services 2015 - 2017
`;

let BlockGen = [];
let code = '';
const xml = {
	category: []
};

documentation.classes.forEach((classy) => {
	if (classy.access !== 'private') {
		const currclass = {
			'@': {
				name: classy.name
			},
			'#': '',
			block: []
		};

		// Constructor
		if (classy.construct) {
			const fields = (classy.construct.params || [])
			let message0 = `Create a new ${classy.name}${fields ? ' with' : ''}`;
			const args0 = []
			fields.forEach((field, index) => {
				message0 += ` %${index + 1}`;
				args0.push({
					type: 'input_value',
					name: field.name
				});
			});
		    BlockGen.push({
		        type: `${classy.name}_constructor`,
				message0,
				args0,
				output: `${classy.name.charAt(0).toUpperCase() + classy.name.slice(1)}`,
		        color: colour.construct,
		        tooltip: classy.description || '',
		        url: `${url}class/${classy.name}`
		    });
			code += (`
				Blockly.JavaScript.${classy.name}_constructor = (block) => {
					const ${classy.name} = Blockly.JavaScript.valueToCode(block, '${classy.name}', Blockly.JavaScript.ORDER_ATOMIC);
					${(classy.construct.params || []).filter(current => !current.name.includes('.')).reduce((array, current) => { array.push(`const ${current.name} = Blockly.JavaScript.valueToCode(block, '${current.name}', Blockly.JavaScript.ORDER_ATOMIC);`); return array; }, []).join('')}
					const code = \`new Discord.${classy.name}(${(classy.construct.params || []).filter(current => !current.name.includes('.')).reduce((array, current) => { array.push(`\${${current.name}}`); return array; }, []).join()})\`;
					return [code, Blockly.JavaScript.ORDER_NONE];
				};
			`);
			currclass.block.push({
				'@': {
					type: `${classy.name}_constructor`
				},
				'#': ''
			});
		}

		// Properties
		if (classy.props) {
			classy.props.forEach((curr) => {
				if (curr.access !== 'private') {
					BlockGen.push({
						type: `${classy.name}_${curr.name}`,
						message0: `get ${curr.name} of %1`,
						args0: [
							{
								type: 'input_value',
								name: classy.name,
								check: [
									classy.name,
									'*'
								],
							}
						],
						inputsInline: true,
						output: curr.type[0].length === 1 ? `'${curr.type[0][0][0].charAt(0).toUpperCase() + curr.type[0][0][0].slice(1)}'` : curr.type[0].reduce((array, current) => { array.push(current[0].charAt(0).toUpperCase() + current[0].slice(1)); return array; }, []),
						colour: colour.prop,
						tooltip: curr.description,
						helpUrl: `${url}class/${classy.name}?scrollTo=${curr.name}`
					});
					code += (`
	Blockly.JavaScript.${classy.name}_${curr.name} = (block) => {
		const ${classy.name} = Blockly.JavaScript.valueToCode(block, '${classy.name}', Blockly.JavaScript.ORDER_ATOMIC);
		const code = \`\${${classy.name}}.${curr.name}\`;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};
	`);
					currclass.block.push({
						'@': {
							type: `${classy.name}_${curr.name}`
						},
						'#': ''
					});
				}
			});
		}

		// Methods
		if (classy.methods) {
			classy.methods.forEach((curr) => {
				if (curr.access !== 'private') {
					const fields = (curr.params || [])
					let message0 = `with %1 ${curr.name}${curr.params ? ' with' : ''}`;
					const args0 = [
						{
							type: 'input_value',
							name: classy.name,
							check: [
								classy.name,
								'*'
							]
						}
					];
					fields.forEach((field, index) => {
						message0 += ` %${index + 2}`;
						args0.push({
							type: 'input_value',
							name: field.name
						});
					});
					if (curr.returns) {
						const returnoutput = curr.returns.types || curr.returns;
						if (returnoutput[0][0][0] !== 'Promise') {
							BlockGen.push({
								type: `${classy.name}_${curr.name}`,
								message0,
								args0,
								inputsInline: true,
								previousStatement: null,
								nextStatement: null,
								colour: colour.method,
								tooltip: curr.description,
								helpUrl: `${url}class/${classy.name}?scrollTo=${curr.name}`
							});
							code += (`
								Blockly.JavaScript.${classy.name}_${curr.name} = (block) => {
									const ${classy.name} = Blockly.JavaScript.valueToCode(block, '${classy.name}', Blockly.JavaScript.ORDER_ATOMIC);
									${(curr.params || []).filter(current => !current.name.includes('.')).reduce((array, current) => { array.push(`const ${current.name} = Blockly.JavaScript.valueToCode(block, '${current.name}', Blockly.JavaScript.ORDER_ATOMIC);`); return array; }, []).join('')}
									const code = \`\${${classy.name}}.${curr.name}(${(curr.params || []).filter(current => !current.name.includes('.')).reduce((array, current) => { array.push(`\${${current.name}}`); return array; }, []).join()});\n\`;
									return code;
								};
							`);
						} else {
							BlockGen.push({
								type: `${classy.name}_${curr.name}`,
								message0,
								args0,
								inputsInline: true,
								output: returnoutput[0].length === 1 ? `'${returnoutput[0][0][0].charAt(0).toUpperCase() + returnoutput[0][0][0].slice(1)}'` : returnoutput[0].reduce((array, current) => { array.push(current[0].charAt(0).toUpperCase() + current[0].slice(1)); return array; }, []),
								colour: colour.method,
								tooltip: curr.description,
								helpUrl: `${url}class/${classy.name}?scrollTo=${curr.name}`
							})
							code += (`
								Blockly.JavaScript.${classy.name}_${curr.name} = (block) => {
									const ${classy.name} = Blockly.JavaScript.valueToCode(block, '${classy.name}', Blockly.JavaScript.ORDER_ATOMIC);
									${(curr.params || []).filter(current => !current.name.includes('.')).reduce((array, current) => { array.push(`const ${current.name} = Blockly.JavaScript.valueToCode(block, '${current.name}', Blockly.JavaScript.ORDER_ATOMIC);`); return array; }, []).join('')}
									const code = \`\${${classy.name}}.${curr.name}(${(curr.params || []).filter(current => !current.name.includes('.')).reduce((array, current) => { array.push(`\${${current.name}}`); return array; }, []).join()})\`;
									return [code, Blockly.JavaScript.ORDER_NONE];
								};
							`);
						}
					} else {
						BlockGen.push({
								type: `${classy.name}_${curr.name}`,
								message0,
								args0,
								inputsInline: true,
								previousStatement: null,
								nextStatement: null,
								colour: colour.method,
								tooltip: curr.description,
								helpUrl: `${url}class/${classy.name}?scrollTo=${curr.name}`
							});
						code += (`
							Blockly.JavaScript.${classy.name}_${curr.name} = (block) => {
								const ${classy.name} = Blockly.JavaScript.valueToCode(block, '${classy.name}', Blockly.JavaScript.ORDER_ATOMIC);
								${(curr.params || []).filter(current => !current.name.includes('.')).reduce((array, current) => { array.push(`const ${current.name} = Blockly.JavaScript.valueToCode(block, '${current.name}', Blockly.JavaScript.ORDER_ATOMIC);`); return array; }, []).join('')}
								const code = \`\${${classy.name}}.${curr.name}(${(curr.params || []).filter(current => !current.name.includes('.')).reduce((array, current) => { array.push(`\${${current.name}}`); return array; }, []).join()});\n\`;
								return [code, Blockly.JavaScript.ORDER_NONE];
							};
						`);
					}
					currclass.block.push({
						'@': {
							type: `${classy.name}_${curr.name}`
						},
						'#': ''
					});
				}
			});
		}

		// Events
		if (classy.events) {
			classy.events.forEach((curr) => {
				if (curr.access !== 'private') {
					const fields = (curr.params || [])
					let message0 = `when %1 emits ${curr.name}`;
					const args0 = [
						{
							type: 'input_value',
							name: classy.name,
							check: [
								classy.name,
								'*'
							]
						}
					];
					fields.forEach((field, index) => {
						message0 += ` %${index + 2}`;
						args0.push({
							type: 'field_variable',
							name: field.name,
							variable: field.name
						});
					});
					message0 += ` %${fields.length + 2}`;
					args0.push({
						type: 'input_statement',
						name: 'statements'
					});

					BlockGen.push({
						type: `${classy.name}_${curr.name}`,
						message0,
						args0,
						inputsInline: true,
						previousStatement: null,
						nextStatement: null,
						colour: colour.method,
						tooltip: curr.description,
						helpUrl: `${url}class/${classy.name}?scrollTo=${curr.name}`
					});
					code += (`
						Blockly.JavaScript.${classy.name}_${curr.name} = (block) => {
							const ${classy.name} = Blockly.JavaScript.valueToCode(block, '${classy.name}', Blockly.JavaScript.ORDER_ATOMIC);
							${(curr.params || []).reduce((array, current) => { array.push(`const ${current.name} = block.getFieldValue('${current.name}');`); return array; }, []).join('')}
							const statements_function = Blockly.JavaScript.statementToCode(block, 'function');
							const code = \`\${${classy.name}}.on('${curr.name}', (${(curr.params || []).reduce((array, current) => { array.push(`\${${current.name}}`); return array; }, []).join()}) => {\${statements_function}});\`;
							return code;
						};
					`);
					currclass.block.push({
						'@': {
							type: `${classy.name}_${curr.name}`
						},
						'#': ''
					});
				}
			});
		}

		xml.category.push(currclass);
	}
});

try {
	fs.writeFile('../app/src/main/assets/toolbox.xml', js2xmlparser.parse('toolbox', xml, {
		format: {
			doubleQuotes: true,
			indent: '\t',
			newline: '\n',
			pretty: true
		}
	}), (err) => {
		if (err) {
			console.dir(err);
			process.exit(1);
		}
	});

	fs.writeFileSync('../app/src/main/assets/blockdef.json', JSON.stringify(BlockGen));

	const uglified = uglify.minify(code);
	fs.writeFileSync('../app/src/main/assets/blockgen.js', header + uglified.code);
} catch (err) {
	console.dir(err);
	process.exit(1);
}

console.log("Successfully built workspace");
