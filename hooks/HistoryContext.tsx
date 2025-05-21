import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Định nghĩa kiểu cho context
type HistoryContextType = {
  history: string[];
  addHistory: (entry: string) => Promise<void>;
  clearHistory: () => Promise<void>;
};

// Tạo context mặc định
const HistoryContext = createContext<HistoryContextType>({
  history: [],
  addHistory: async () => {},
  clearHistory: async () => {},
});

// Provider để bao bọc toàn app
export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  // Load lịch sử từ AsyncStorage
  const loadHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem('calculator_history');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Lỗi khi load lịch sử:', error);
    }
  };

  // Thêm phép tính mới
  const addHistory = async (entry: string) => {
    try {
      const updated = [...history, entry];
      setHistory(updated);
      await AsyncStorage.setItem('calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Lỗi khi thêm lịch sử:', error);
    }
  };

  // Xóa toàn bộ lịch sử
  const clearHistory = async () => {
    try {
      setHistory([]);
      await AsyncStorage.removeItem('calculator_history');
    } catch (error) {
      console.error('Lỗi khi xóa lịch sử:', error);
    }
  };

  return (
    <HistoryContext.Provider value={{ history, addHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

// Custom hook để sử dụng
export const useHistory = () => useContext(HistoryContext);
