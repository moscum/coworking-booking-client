import React from 'react';

import { Calendar } from 'clcm';

export const CalendarDropdown: React.FC = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();

  const todayString = `${mm}/${dd}/${yyyy}`;
  return (
    <div>
      <p>{todayString}</p>
      <Calendar />
    </div>
  );
};
