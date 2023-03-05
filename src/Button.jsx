import React from 'react';

export const Button = (props) => {
  // console.log(props);

  return (
    <button
      className={props.color === 'red' ? 'red-btn' : 'btn'}
      onClick={props.onClick}
      // style={{ backgroundColor: props.color }}
    >
      {props.children}
    </button>
  );
};
