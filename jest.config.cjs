/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {

      // if your using tsconfig.paths thers is no harm in telling jest
    '@components/(.*)$': '<rootDir>/src/components/$1',
    '@/(.*)$': '<rootDir>/src/$1',
    "\\.(css|less|scss|sass)$": "identity-obj-proxy" //this fixed the import syntax error for importing css in app component
  },
  testPathIgnorePatterns: ["/node_modules/"],
 // to obtain access to the matchers.
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
      
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    "^.+\\.tsx?$" : "ts-jest",
    "node_modules/(nanoid)/.+\\.(j|t)sx?$" :
      "ts-jest",
},
  transformIgnorePatterns: [
    "/node_modules/(?!nanoid)" // Ignore parsing files/modules under nanoid directory
  ],
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jsdom',
};