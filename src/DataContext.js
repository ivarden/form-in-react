import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

const delPhone = (obj, ...keyses) => {
  keyses.forEach((item) => delete obj[item]);
  return obj;
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const setValues = (values) => {
    setData((prevData) => {
      const _prevData = prevData.hasPhone
        ? prevData
        : delPhone(prevData, "hasPhone", "phoneNumber");
      return { ..._prevData, ...values };
    });
  };
  return (
    <DataContext.Provider value={{ data, setValues }}>
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);
