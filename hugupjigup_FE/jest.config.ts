import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    // '^.+\\.vue$': 'vue-jest',
    '^.+\\.ts$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  // setupFilesAfterEnv: ['<rootDir>/tests/setup.ts']
};

export default config;
