module.exports = {
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/application/**/*.ts',
    '<rootDir>/src/domain/use-cases/**/*.ts',
    '<rootDir>/src/infra/**/*.ts',
    '<rootDir>/src/main/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/main/adapters/bootstrap.ts',
    '/src/main/adapters/index.ts',
    '/src/main/graphql/scalars/',
    '/src/infra/seed/',
    '/src/infra/db/',
    '/src/main/config/',
    '/src/server.ts'
  ],
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  testMatch: ['**/*.spec.ts'],
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  transform: {
    '\\.ts$': 'ts-jest'
  }
}
