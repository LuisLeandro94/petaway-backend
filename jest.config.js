// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
	// Automatically clear mock calls and instances between every test
	clearMocks: true,

	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	collectCoverage: true,
	// An array of regexp pattern strings used to skip coverage collection
	coveragePathIgnorePatterns: ['<rootDir>/node_modules/(?!@foo)','<rootDir>/dist','<rootDir>/app/src/v1/services/service.ts'],

	globals: {
		'ts-jest': {
			tsConfigFile: 'tsconfig.json',
			enableTsDiagnostics: true
		}
	},

	// A map from regular expressions to module names that allow to stub out resources with a single module
	moduleNameMapper: {
		'~v1/(.*)': '<rootDir>/app/src/v1/$1',
		'~models$': '<rootDir>/app/src/models/index.ts',
		'~models/(.*)': '<rootDir>/app/src/models/$1',
		'~config$': '<rootDir>/app/src/config/index.ts',
		'~config/(.*)': '<rootDir>/app/src/config/$1',
		'~utils/(.*)': '<rootDir>/app/src/utils/$1'
	},

	testEnvironment: 'node',

	testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',

	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest'
	},

	transformIgnorePatterns: ['<rootDir>/node_modules/(?!@foo)']
};
