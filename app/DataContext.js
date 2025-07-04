'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sheet2Data, setSheet2Data] = useState([]);

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const res = await fetch('/api/read-sheet');
        const data = await res.json();
        setSheetData(data.sheet1 || []);
        setSheet2Data(data.sheet2 || []);
        console.log('✅ Sheet data:', data);
      } catch (error) {
        console.error('❌ Error fetching sheet data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSheetData();
  }, []);

  return (
    <DataContext.Provider value={{ sheetData,sheet2Data, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);