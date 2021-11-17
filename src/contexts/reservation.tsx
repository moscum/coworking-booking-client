import React, { createContext, useContext, useEffect, useState } from 'react';

import { useReservations } from '@src/hooks';
import { ReservationModel, TableModel } from '@src/models';

interface ReservationContextModel {
  isLoading: boolean;
  selectedTable: TableModel | null;
  setSelectedTable: React.Dispatch<React.SetStateAction<TableModel | null>>;
  selectedDate: Date;
  setSelectedDate: (selectedDate: Date) => void;
  reservations: ReservationModel[] | undefined;
}

const ReservationContext = createContext<Partial<ReservationContextModel>>({});

export const ReservationProvider: React.FC = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTable, setSelectedTable] = useState<TableModel | null>(null);
  const [reservations, setReservations] = useState<
    ReservationModel[] | undefined
  >(undefined);
  const { data, isValidating } = useReservations(selectedDate);

  useEffect(() => {
    if (data !== undefined && selectedTable) {
      setReservations(
        data.filter((i: ReservationModel) => i.tableId === selectedTable.id)
      );
    }
  }, [selectedTable, selectedDate, data]);

  return (
    <ReservationContext.Provider
      value={{
        isLoading: isValidating,
        selectedTable,
        setSelectedTable,
        selectedDate,
        setSelectedDate,
        reservations,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => useContext(ReservationContext);
