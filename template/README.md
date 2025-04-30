# HelloWorld Test Coverage Guide

## Overview

This guide provides instructions for achieving 100% test coverage in the HelloWorld codebase. The project is configured to require 100% coverage for statements, branches, functions, and lines.

## Test Configuration

The Jest configuration has been updated to:

1. Include all JavaScript/TypeScript files in the `src` directory for coverage collection
2. Exclude certain types of files that typically don't need test coverage:
   - Type declaration files (*.d.ts)
   - Style files (*.styles.*)
   - Index files (index.*)
   - Type definition files (*.types.*)
   - Constants files (*.constants.*)
   - Enum files (*.enum.*)
3. Set coverage thresholds to 100% for statements, branches, functions, and lines

## Running Tests

The following npm scripts are available for running tests:

```bash
# Run tests without coverage
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode (useful during development)
npm run test:watch
```

## Viewing Coverage Reports

After running tests with coverage, you can view the coverage report in the following ways:

1. Open `coverage/lcov-report/index.html` in a web browser to view the HTML coverage report
2. Check the console output for a summary of coverage statistics

## Writing Tests to Achieve 100% Coverage

To achieve 100% coverage, you'll need to write tests for all code in the `src` directory. Here are some guidelines:

### Test File Structure

Test files should be placed alongside the files they test, with a `.spec.tsx` or `.spec.ts` extension. For example:

- `src/components/Button/button.view.tsx` → `src/components/Button/button.view.spec.tsx`
- `src/services/api.service.ts` → `src/services/api.service.spec.ts`

### Testing React Components

For React components, use `@testing-library/react-native` to render and interact with components. Example:

```tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './button.view';

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button title="Test Button" onPress={jest.fn()} />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Test Button" onPress={onPress} />);
    fireEvent.press(getByText('Test Button'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

### Testing Services and Utilities

For services and utilities, test all possible code paths and edge cases. Example:

```tsx
import { formatDate } from './date.utils';

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2023-01-01');
    expect(formatDate(date)).toBe('01/01/2023');
  });

  it('returns empty string for null date', () => {
    expect(formatDate(null)).toBe('');
  });
});
```

### Testing Hooks

For custom hooks, use `@testing-library/react-hooks` to test their behavior. Example:

```tsx
import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from './counter.hook';

describe('useCounter', () => {
  it('increments counter', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });
});
```

### Testing Redux/Context State

For Redux or Context state, test actions, reducers, and selectors separately. Example:

```tsx
import { authReducer, login, logout } from './auth.store';

describe('authReducer', () => {
  it('handles login action', () => {
    const initialState = { isAuthenticated: false, user: null };
    const user = { id: 1, name: 'Test User' };
    const action = login(user);
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({ isAuthenticated: true, user });
  });

  it('handles logout action', () => {
    const initialState = { isAuthenticated: true, user: { id: 1, name: 'Test User' } };
    const action = logout();
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({ isAuthenticated: false, user: null });
  });
});
```

## Tips for Achieving 100% Coverage

1. **Start with the easiest files**: Begin with simple utilities and components that have few dependencies.
2. **Mock external dependencies**: Use Jest's mocking capabilities to mock API calls, navigation, etc.
3. **Test edge cases**: Make sure to test all conditional branches, error handling, etc.
4. **Use test-driven development (TDD)**: Write tests before implementing new features.
5. **Regularly run coverage reports**: Check coverage regularly to identify untested code.
6. **Refactor complex functions**: Break down complex functions into smaller, more testable functions.

## Troubleshooting

If you're having trouble achieving 100% coverage:

1. **Check uncovered lines**: The coverage report will show which lines are not covered.
2. **Look for untested branches**: Make sure all conditional branches are tested.
3. **Test error handling**: Make sure error cases are tested.
4. **Check for untested components**: Make sure all components have tests.

## Conclusion

Achieving 100% test coverage is a challenging but worthwhile goal. It helps ensure that your code is reliable, maintainable, and free of bugs. By following the guidelines in this document, you can work towards achieving 100% coverage in the HelloWorld codebase.
