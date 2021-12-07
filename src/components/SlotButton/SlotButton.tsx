import React from 'react';

import cn from 'clsx';

import { SlotButtonProps } from '@components/SlotButton/SlotButton.types';

const SlotButton: React.VFC<SlotButtonProps> = ({
  time,
  free,
  busy,
  selected,
  disabled,
}) => {
  time.setHours(1);
  return (
    <button
      className={cn(
        'w-16 h-7 rounded text-xl',
        free && 'bg-gray-1 text-black',
        busy && 'bg-accent text-white',
        selected && 'bg-primary text-white',
        disabled && 'bg-gray-1 text-gray-2'
      )}
      disabled={disabled}
    >
      {`${time.getHours() < 10 ? '0' : ''}${time.getHours()}:00`}
    </button>
  );
};

export default SlotButton;
