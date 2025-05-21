import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'calculator_history';

export const saveHistory = async (history: string[]) => {
  try {
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.error('Lỗi khi lưu lịch sử:', e);
  }
};

export const loadHistory = async (): Promise<string[]> => {
  try {
    const value = await AsyncStorage.getItem(HISTORY_KEY);
    return value ? JSON.parse(value) : [];
  } catch (e) {
    console.error('Lỗi khi tải lịch sử:', e);
    return [];
  }
};
