import nextJest from 'next/jest'

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
	setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
	moduleNameMapper: {
		// Handle module aliases (this will be automatically configured for you soon)
		'~/(.*)$': '<rootDir>/src/$1',
	},
	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
	testEnvironment: 'jest-environment-jsdom',
}

export default createJestConfig(customJestConfig)
