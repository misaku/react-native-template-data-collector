import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DevContent from './dev-mode-content.view';
import { useDevModeContentController } from './dev-mode-content.controller';

// Mock the useDevModeContentController hook
jest.mock('./dev-mode-content.controller', () => ({
  useDevModeContentController: jest.fn(),
}));

// Mock the DrawerItem component
jest.mock('@react-navigation/drawer', () => ({
  DrawerItem: ({ label, onPress, ...props }) => {
    const Label = label({ color: '#000000' });
    return (
      <div testID="drawer-item" onPress={onPress} {...props}>
        {Label}
      </div>
    );
  },
}));

describe('DevContent Component', () => {
  const mockListEvents = [
    { name: 'Event 1', action: jest.fn() },
    { name: 'Event 2', action: jest.fn() },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useDevModeContentController as jest.Mock).mockReturnValue({
      listEvents: mockListEvents,
    });
  });

  it('renders correctly with list events', () => {
    const { getByTestId } = render(<DevContent />);

    // Check if the drawer items are rendered
    expect(getByTestId('Event 1-0')).toBeTruthy();
    expect(getByTestId('Event 2-1')).toBeTruthy();
  });

  it('calls the action when a drawer item is pressed', () => {
    const { getAllByTestId } = render(<DevContent />);

    // Get all drawer items
    const drawerItems = getAllByTestId('drawer-item');

    // Press the first drawer item
    fireEvent.press(drawerItems[0]);

    // Check if the action was called
    expect(mockListEvents[0].action).toHaveBeenCalled();

    // Press the second drawer item
    fireEvent.press(drawerItems[1]);

    // Check if the action was called
    expect(mockListEvents[1].action).toHaveBeenCalled();
  });

  it('renders text with correct number of lines', () => {
    // Mock a long event name
    const longEventName = 'This is a very long event name that should be wrapped to multiple lines';
    (useDevModeContentController as jest.Mock).mockReturnValue({
      listEvents: [{ name: longEventName, action: jest.fn() }],
    });

    const { getByTestId } = render(<DevContent />);

    // Check if the text is rendered with the correct number of lines
    const text = getByTestId(`${longEventName}-0`);
    expect(text.props.numberOfLines).toBe(Math.ceil(longEventName.length / 15));
  });
});
