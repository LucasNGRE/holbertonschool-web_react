import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

test('it should call markNotificationAsRead with the correct id when the notification item is clicked', () => {
  const mockMarkNotificationAsRead = jest.fn();

  const props = {
    id: 42,
    type: 'default',
    value: 'Test notification',
    markNotificationAsRead: mockMarkNotificationAsRead,
  };

  render(<NotificationItem {...props} />);

  const liElement = screen.getByRole('listitem');

  fireEvent.click(liElement);

  expect(mockMarkNotificationAsRead).toHaveBeenCalledTimes(1);
  expect(mockMarkNotificationAsRead).toHaveBeenCalledWith(42);
});

describe('NotificationItem - PureComponent behavior', () => {
  let markNotificationAsRead;

  beforeEach(() => {
    jest.clearAllMocks();
    markNotificationAsRead = jest.fn();
  });

  test('should re-render when props change', () => {
    const renderSpy = jest.spyOn(NotificationItem.prototype, 'render');

    const { rerender } = render(
      <NotificationItem
        id={1}
        type="urgent"
        value="New notification"
        markNotificationAsRead={markNotificationAsRead}
      />
    );

    rerender(
      <NotificationItem
        id={1}
        type="urgent"
        value="Updated notification"
        markNotificationAsRead={markNotificationAsRead}
      />
    );

    expect(renderSpy).toHaveBeenCalled();

    renderSpy.mockRestore();
  });

  test('should not re-render when props do not change', () => {
    const renderSpy = jest.spyOn(NotificationItem.prototype, 'render');

    const { rerender } = render(
      <NotificationItem
        id={1}
        type="urgent"
        value="New notification"
        markNotificationAsRead={markNotificationAsRead}
      />
    );

    const renderCount = renderSpy.mock.calls.length;

    rerender(
      <NotificationItem
        id={1}
        type="urgent"
        value="New notification"
        markNotificationAsRead={markNotificationAsRead}
      />
    );

    expect(renderSpy.mock.calls.length).toBe(renderCount);

    renderSpy.mockRestore();
  });
});
