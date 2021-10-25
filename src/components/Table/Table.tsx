import React, { useState } from 'react';

interface TableProps {
  id: number;
  status: string;
}

export const Table: React.FC<TableProps> = (TableProps) => {
  const [tableChosen, setTableChosen] = useState(TableProps.id);

  const ChangeValue = (e: any) => {
    setTableChosen(e.target.value);
  };

  if (TableProps.status === 'occupied for day') {
    return (
      <div>
        <button
          className={
            'bg-gray-2 w-8 h-16 focus:opacity-75 hover:opacity-75 text-white font-bold'
          }
          value={tableChosen}
          onClick={ChangeValue}
        >
          <div>
            {TableProps.id}
            <div
              className={
                'bg-accent w-4 h-4 border-solid border-white border-2 rounded absolute ml-6 -mt-5'
              }
            ></div>
          </div>
        </button>
      </div>
    );
  }
  if (TableProps.status === 'occupied for time slot') {
    return (
      <div>
        <button
          className={
            'bg-gray-2 w-8 h-16 focus:opacity-75 hover:opacity-75 text-white font-bold'
          }
          value={tableChosen}
          onClick={ChangeValue}
        >
          <div>
            {TableProps.id}
            <div
              className={
                'bg-success w-4 h-4 border-solid border-white border-2 rounded absolute ml-6 -mt-5'
              }
            ></div>
          </div>
        </button>
      </div>
    );
  }
  return (
    <div>
      <button
        className={
          'bg-gray-2 w-8 h-16 focus:opacity-75 hover:opacity-75 text-white font-bold'
        }
        value={tableChosen}
        onClick={ChangeValue}
      >
        <div>
          {TableProps.id}
          <div
            className={
              'bg-primary w-4 h-4 border-solid border-white border-2 rounded absolute ml-6 -mt-5'
            }
          ></div>
        </div>
      </button>
    </div>
  );
};
