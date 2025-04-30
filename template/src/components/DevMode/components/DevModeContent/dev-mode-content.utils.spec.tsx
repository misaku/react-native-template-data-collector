import { makeString, makeMenuItem } from './dev-mode-content.utils';

describe('DevModeContent Utils', () => {
  describe('makeString', () => {
    it('returns the string if the input is a string', () => {
      const input = 'test-string';
      const result = makeString(input);
      expect(result).toBe(input);
    });

    it('returns a JSON string if the input is not a string', () => {
      const input = { key: 'value' };
      const result = makeString(input);
      expect(result).toBe(JSON.stringify(input));
    });

    it('handles arrays', () => {
      const input = [1, 2, 3];
      const result = makeString(input);
      expect(result).toBe(JSON.stringify(input));
    });

    it('handles numbers', () => {
      const input = 123;
      const result = makeString(input);
      expect(result).toBe(JSON.stringify(input));
    });

    it('handles null', () => {
      const input = null;
      const result = makeString(input);
      expect(result).toBe(JSON.stringify(input));
    });
  });

  describe('makeMenuItem', () => {
    it('creates a menu item with a name and action', () => {
      const mockFn = jest.fn();
      const name = 'test-item';
      const data = 'test-data';

      const result = makeMenuItem(name, data, mockFn);

      expect(result).toEqual({
        name,
        action: expect.any(Function),
      });
    });

    it('calls the function with each item in the payload when action is called', async () => {
      const mockFn = jest.fn();
      const name = 'test-item';
      const data = 'test-data';

      const result = makeMenuItem(name, data, mockFn);

      // Call the action
      await result.action();

      // Check if the function was called with the data
      expect(mockFn).toHaveBeenCalledWith(data);
    });

    it('handles array data by calling the function with each item', async () => {
      const mockFn = jest.fn();
      const name = 'test-item';
      const data = ['item1', 'item2', 'item3'];

      const result = makeMenuItem(name, data, mockFn);

      // Call the action
      await result.action();

      // Check if the function was called with each item
      expect(mockFn).toHaveBeenCalledTimes(3);
      expect(mockFn).toHaveBeenCalledWith('item1');
      expect(mockFn).toHaveBeenCalledWith('item2');
      expect(mockFn).toHaveBeenCalledWith('item3');
    });

    it('handles object data by converting it to a string', async () => {
      const mockFn = jest.fn();
      const name = 'test-item';
      const data = { key: 'value' };

      const result = makeMenuItem(name, data, mockFn);

      // Call the action
      await result.action();

      // Check if the function was called with the stringified data
      expect(mockFn).toHaveBeenCalledWith(JSON.stringify(data));
    });
  });
});
