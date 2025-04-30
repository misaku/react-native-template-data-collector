import 'jest-styled-components';
import {cleanup} from '@testing-library/react-native';

import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock';

// eslint-disable-next-line no-undef
afterEach(() => {
  cleanup();
});

// Mock for react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = jest.fn();

  return Reanimated;
});

// Mock for @react-native-async-storage/async-storage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-orientation-locker', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  lockToPortrait: jest.fn(),
  lockToLandscape: jest.fn(),
  lockToLandscapeLeft: jest.fn(),
  lockToLandscapeRight: jest.fn(),
  unlockAllOrientations: jest.fn(),
}));

mockRNCNetInfo.addEventListener = jest.fn((func) => {
  func(mockRNCNetInfo.useNetInfo());
  return jest.fn();
});

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

jest.mock('react-native-device-info', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = jest.fn();

  return Reanimated;
});

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const Platform = jest.requireActual(
    'react-native/Libraries/Utilities/Platform',
  );
  Platform.OS = 'android';
  return Platform;
});
