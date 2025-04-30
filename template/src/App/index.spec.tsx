import React from 'react';
import { render } from '@testing-library/react-native';
import Index from './index';

// Mock all dependencies
jest.mock('./app.controller', () => ({
  useAppController: jest.fn().mockReturnValue({
    hideDialog: jest.fn(),
    visible: false,
    setToCollector: jest.fn(),
    setToNotCollector: jest.fn(),
  }),
}));

jest.mock('react-native-keep-awake', () => 'KeepAwake');
jest.mock('react-native-paper', () => ({
  Dialog: {
    Title: jest.fn().mockReturnValue(null),
    Content: jest.fn().mockReturnValue(null),
    Actions: jest.fn().mockReturnValue(null),
  },
  Portal: jest.fn().mockReturnValue(null),
  Text: jest.fn().mockReturnValue(null),
}));
jest.mock('@components/Button', () => ({
  Button: jest.fn().mockReturnValue(null),
}));

jest.mock('./app.routes', () => ({
  AppRoutes: jest.fn().mockReturnValue(null),
}));

jest.mock('./app.styles', () => ({
  DialogCustom: jest.fn().mockReturnValue(null),
  Strong: jest.fn().mockReturnValue(null),
}));

// Mock AppProviders to be a simple function that returns its children
jest.mock('./app.providers', () => ({
  AppProviders: jest.fn(({ children }) => children),
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    // Just test that the component renders without throwing an error
    expect(() => render(<Index />)).not.toThrow();
  });
});
