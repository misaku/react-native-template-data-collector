import React from 'react';
import { render } from '@testing-library/react-native';
import { DevMode } from './dev-mode.view';

// Mock the DrawerContentScrollView component
jest.mock('@react-navigation/drawer', () => ({
  DrawerContentScrollView: ({ children, ...props }) => (
    <div testID="drawer-content-scroll-view" {...props}>
      {children}
    </div>
  ),
}));

// Mock the DevContent component
jest.mock('./components/DevModeContent/dev-mode-content.view', () => ({
  __esModule: true,
  default: jest.fn(props => (
    <div testID="dev-content" {...props} />
  )),
}));

describe('DevMode Component', () => {
  it('renders correctly', () => {
    const mockProps = {
      navigation: {
        closeDrawer: jest.fn(),
      },
    };

    const { getByTestId } = render(<DevMode {...mockProps} />);

    // Check if the DrawerContentScrollView is rendered
    expect(getByTestId('drawer-content-scroll-view')).toBeTruthy();

    // Check if the DevContent is rendered with the correct props
    const devContent = getByTestId('dev-content');
    expect(devContent.props.navigation).toBe(mockProps.navigation);
  });
});
