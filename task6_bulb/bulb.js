var scheme1 = {
		name: 'Gate',
		type: 'XOR',
		children: [
			{
				name: 'Gate',
				type: 'AND',
				children: [
					{
						name: 'Switch',
						type: 'ON',
						state: 1,
					},
					{
						name: 'Switch',
						type: 'OFF',
						state: 0,
					},
				],
			},
			{
				name: 'Gate',
				type: 'NOT',
				children: [
					{
						name: 'Switch',
						type: 'ON',
						state: 1,
					},
				],
			},
		],
	},
	scheme2 = {
		name: 'Gate',
		type: 'AND',
		children: [
			{
				name: 'Gate',
				type: 'OR',
				children: [
					{
						name: 'Switch',
						type: 'ON',
						state: 1,
					},
					{
						name: 'Gate',
						type: 'XOR',
						children: [
							{
								name: 'Switch',
								type: 'OFF',
								state: 0,
							},
							{
								name: 'Gate',
								type: 'NOT',
								children: [
									{
										name: 'Switch',
										type: 'ON',
										state: 1,
									},
								],
							},
						],
					},
				],
			},
			{
				name: 'Gate',
				type: 'NOT',
				children: [
					{
						name: 'Switch',
						type: 'ON',
						state: 1,
					},
				],
			},
		],
	},
	scheme3 = {
		name: 'Gate',
		type: 'XOR',
		children: [
			{
				name: 'Gate',
				type: 'NOT',
				children: [
					{
						name: 'Switch',
						type: 'OFF',
						state: 0,
					},
				],
			},
			{
				name: 'Gate',
				type: 'OR',
				children: [
					{
						name: 'Gate',
						type: 'OR',
						children: [
							{
								name: 'Switch',
								type: 'OFF',
								state: 0,
							},
							{
								name: 'Gate',
								type: 'AND',
								children: [
									{
										name: 'Switch',
										type: 'OFF',
										state: 0,
									},
									{
										name: 'Switch',
										type: 'ON',
										state: 1,
									},
								],
							},
						],
					},
					{
						name: 'Switch',
						type: 'OFF',
						state: 0,
					},
				],
			},
		],
	},
	scheme4 = {
		name: 'Gate',
		type: 'AND',
		children: [
			{
				name: 'Gate',
				type: 'OR',
				children: [
					{
						name: 'Gate',
						type: 'AND',
						children: [
							{
								name: 'Switch',
								type: 'ON',
								state: 1,
							},
							{
								name: 'Switch',
								type: 'OFF',
								state: 0,
							},
						],
					},
					{
						name: 'Gate',
						type: 'AND',
						children: [
							{
								name: 'Switch',
								type: 'ON',
								state: 1,
							},
							{
								name: 'Switch',
								type: 'ON',
								state: 1,
							},
						],
					},
				],
			},
			{
				name: 'Gate',
				type: 'AND',
				children: [
					{
						name: 'Gate',
						type: 'OR',
						children: [
							{
								name: 'Switch',
								type: 'OFF',
								state: 0,
							},
							{
								// 1
								name: 'Switch',
								type: 'ON',
								state: 1,
							},
						],
					},
					{
						name: 'Gate',
						type: 'NOT',
						children: [
							//1
							{
								name: 'Switch',
								type: 'OFF',
								state: 0,
							},
						],
					},
				],
			},
		],
	};

function isLampOn(node) {
	if (node.name === 'Switch') {
		return node.state;
	}

	switch (node.type) {
		case 'AND':
			return node.children.reduce(function(result, current) {
				return result && isLampOn(current);
			}, 0);

		case 'OR':
			return node.children.reduce(function(result, current) {
				return result || isLampOn(current);
			}, 0);

		case 'XOR':
			return node.children.reduce(function(result, current) {
				return result ^ isLampOn(current);
			}, 0);

		case 'NOT':
			return +!isLampOn(node.children[0]);
	}
}

function lightOn() {
	console.log('scheme1' + ' - ' + isLampOn(scheme1));
	console.log('scheme2' + ' - ' + isLampOn(scheme2));
	console.log('scheme3' + ' - ' + isLampOn(scheme3));
	console.log('scheme4' + ' - ' + isLampOn(scheme4));
}

console.log(lightOn());
