import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
	verbose: true,
	transform: {
		'^.+\\.ts?$': 'ts-jest'
	},
	moduleNameMapper: {
		'~v1/(.*)': '<rootDir>/app/src/v1/$1',
		'~models/(.*)': '<rootDir>/app/src/models/$1',
		'~config/(.*)': '<rootDir>/app/src/config/$1',
		'~utils/(.*)': '<rootDir>/app/src/utils/$1'
	}
};
export default config;
