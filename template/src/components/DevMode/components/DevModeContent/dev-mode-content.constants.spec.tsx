import {makeListEvents} from './dev-mode-content.constants';
import {makeMenuItem} from './dev-mode-content.utils';

// Mock the makeMenuItem function
jest.mock('./dev-mode-content.utils', () => ({
  makeMenuItem: jest.fn((name, data, fn) => ({
    name,
    data,
    fn,
  })),
}));

describe('DevModeContent Constants', () => {
  describe('makeListEvents', () => {
    it('returns an array of menu items', () => {
      const mockFn = jest.fn();
      const result = makeListEvents(mockFn);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
    });

    it('calls makeMenuItem with the correct arguments for each item', () => {
      const mockFn = jest.fn();
      makeListEvents(mockFn);

      // Check the first call to makeMenuItem
      expect(makeMenuItem).toHaveBeenCalledWith(
        '0-0-0-0',
        {street: 0, block: 0, apartment: 0, room: 0},
        mockFn,
      );

      // Check the second call to makeMenuItem
      expect(makeMenuItem).toHaveBeenCalledWith(
        '0-0-0-1',
        {street: 0, block: 0, apartment: 0, room: 1},
        mockFn,
      );
    });

    it('passes the provided function to makeMenuItem', () => {
      const mockFn = jest.fn();
      makeListEvents(mockFn);

      const {calls} = (makeMenuItem as jest.Mock).mock;
      expect(calls.length).toBe(6);
      expect(typeof calls[0][2]).toBe('function');
      expect(typeof calls[1][2]).toBe('function');
    });
  });
});
