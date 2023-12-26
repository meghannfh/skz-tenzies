/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {

      // if your using tsconfig.paths thers is no harm in telling jest
    '@components/(.*)$': '<rootDir>/src/assets/components/$1',
    '@/(.*)$': '<rootDir>/src/$1',
  },
 // to obtain access to the matchers.
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
      
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {"^.+\\.tsx?$" : "ts-jest"},
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jsdom',
};