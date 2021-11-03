import React, { useState, useContext } from 'react';

import 'classnames';
import { TableProps } from '@src/models/TableModel';

import styles from '../../styles/TablesArea.module.scss';
import { TableContext, ChosenContext } from './TableContext';

export const Table: React.FC<TableProps> = (props) => {
  const [selected, setSelected] = useState(false);
  const [context, setContext] = useContext(TableContext);
  const [chosenContext, setChosenContext] = useContext(ChosenContext);
  let tableStatus = `w-4 h-4 border-solid border-white border-2 rounded ${styles.disabled} `;
  let positionStatus = '';
  let buttonStatus = '';

  const setValues = () => {
    setSelected(!selected);
    setContext(props.props.id);
    setChosenContext(`${selected}`);
    console.log(
      'selected: ',
      selected,
      '   context: ',
      context,
      '   is table chosen: ',
      chosenContext
    );
  };

  if (props.props.status === 'Busy') tableStatus += 'bg-accent ';
  else if (props.props.status === 'Partially') tableStatus += 'bg-primary ';
  else if (props.props.status === 'Free') tableStatus += 'bg-success ';
  // console.log(selected);
  if (props.props.id >= '5' && props.props.id <= '7') {
    tableStatus += 'ml-6 -mt-5';
    positionStatus += `${styles.allVertical} `;
    buttonStatus += styles.buttonCardVertical;
    if (props.props.id === '6') {
      positionStatus += styles.tall;
    } else if (props.props.id === '7') {
      positionStatus += styles.lastVertical;
    }
    return (
      <div className={positionStatus}>
        <button
          className={buttonStatus}
          value={props.props.id}
          // onClick={() => setSelected(!selected)}
          onClick={setValues}
        >
          <div className={styles.disabled}>
            {props.props.id}
            <div className={tableStatus}></div>
          </div>
        </button>
      </div>
    );
  }
  tableStatus += `ml-6 mt-0.5 `;
  positionStatus += `${styles.allHorizontal} `;
  if (props.props.id === '9') positionStatus += styles.thirdColumnOne;
  else if (props.props.id === '10') positionStatus += styles.thirdColumnTwo;
  return (
    <div className={positionStatus}>
      <button
        className={styles.buttonCardHorizontal}
        value={props.props.id}
        // onClick={() => setSelected(!selected)}
        onClick={setValues}
      >
        <div className={styles.disabled}>
          {props.props.id}
          <div className={tableStatus}></div>
        </div>
      </button>
    </div>
  );
};
