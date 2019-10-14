module.exports = {
    verbose: true,
    silent: false,
    transform: {
      '^.+\\.tsx?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    testMatch: ['**/?(*.)(test).(ts)'],
    testPathIgnorePatterns: ['/dist/'],
    transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
    roots: [
      '<rootDir>/src'
    ],
    preset: 'ts-jest',
    globals: {
      'ts-jest': {
        tsConfig: 'tsconfig.json'
      }
    },
    collectCoverage: true,
    collectCoverageFrom: [
      '**/src/**/*.ts',
      '!**/typings.d.ts',
      '!**/src/__tests__/**',
    ],
    coverageThreshold: {
      global: {
        branches: 20,
        functions: 20,
        lines: 20,
        statements: 20,
      },
    },
    coverageReporters: ['text', 'lcov'],
  };
  