/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  passWithNoTests: true,
  transform: {
    '^.+\\.svg$': '<rootDir>/jestSvgTransform.js',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}
