import { useHistory } from '@/hooks/HistoryContext';
import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

const HistoryScreen = () => {
  const { history, clearHistory } = useHistory(); // Lấy thêm hàm xóa

  const renderItem = ({ item }: { item: any }) => {
    if (!item || typeof item !== 'object') return null;

    return (
      <View style={styles.item}>
        <Text style={styles.expression}>{item.expression}</Text>
        <Text style={styles.result}>= {item.result}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lịch sử tính toán</Text>
        <Button title="Xóa lịch sử" onPress={clearHistory} color="#d9534f" />
      </View>
      <FlatList
        data={history.slice().reverse()}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  item: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  expression: {
    fontSize: 18,
    color: '#333',
  },
  result: {
    fontSize: 18,
    color: '#008000',
    fontWeight: 'bold',
  },
});

export default HistoryScreen;
