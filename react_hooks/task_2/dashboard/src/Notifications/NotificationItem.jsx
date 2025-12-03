import React, { memo } from 'react';

function NotificationItem(props) {
  const { type, html, value, markNotificationAsRead, id } = props;

  const baseClasses = `
    pl-1
    max-[912px]:w-full
    max-[912px]:border-b
    max-[912px]:border-black
    max-[912px]:p-[12px]
    max-[912px]:text-[20px]
    max-[912px]:leading-relaxed
  `;

  if (type === 'default') {
    return (
      <li
        className={`text-[color:var(--default-notification-item)] ${baseClasses}`}
        data-notification-type={type}
        onClick={() => markNotificationAsRead(id)}
      >
        {value}
      </li>
    );
  }

  if (type === 'urgent' && html !== undefined) {
    return (
      <li
        className={`text-[color:var(--urgent-notification-item)] ${baseClasses}`}
        data-notification-type={type}
        dangerouslySetInnerHTML={html}
        onClick={() => markNotificationAsRead(id)}
      ></li>
    );
  }

  return (
    <li
      className={`text-[color:var(--urgent-notification-item)] ${baseClasses}`}
      data-notification-type={type}
      onClick={() => markNotificationAsRead(id)}
    >
      {value}
    </li>
  );
}

export default memo(NotificationItem);
