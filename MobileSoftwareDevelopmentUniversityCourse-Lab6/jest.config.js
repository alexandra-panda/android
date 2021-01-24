module.exports = {
  preset: 'react-native',
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/jest/setupTests.js'],
  collectCoverage: false,
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/jest'],
  testMatch: [
    '**/__tests__/**/?(*.)+(spec|test).+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(jest-)?react-native)'],
}
