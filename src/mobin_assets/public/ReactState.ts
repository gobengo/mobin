import * as React from "react";

// ReactState
export default <T extends any>(initialValue?: T) => {
  const [value, setValue] = React.useState(initialValue);
  const state = Object.assign(
    // put set on the prototype so that { value } serializes nicely
    Object.create({
      set: setValue,
    }),
    { value }
  );
  return state;
};
