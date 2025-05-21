import { Entypo, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const buttons = [
    { label: 'Chiều dài', icon: <FontAwesome5 name="ruler" size={20} color="green" />, type: 'length' },
    { label: 'Khối lượng', icon: <FontAwesome5 name="weight" size={20} color="red" />, type: 'weight' },
    { label: 'Nhiệt độ', icon: <MaterialCommunityIcons name="thermometer" size={20} color="red" />, type: 'temperature' },
    { label: 'Thể tích', icon: <Entypo name="drop" size={20} color="blue" />, type: 'volume' },
    { label: 'Thời gian', icon: <FontAwesome5 name="clock" size={20} color="purple" />, type: 'time' },
    { label: 'Tốc độ', icon: <Ionicons name="speedometer" size={20} color="blue" />, type: 'speed' },
  ];

  const [searchText, setSearchText] = useState('');
  const [filteredButtons, setFilteredButtons] = useState(buttons);

  useEffect(() => {
    const lowerSearch = searchText.toLowerCase();
    const filtered = buttons.filter((btn) =>
      btn.label.toLowerCase().startsWith(lowerSearch)
    );

    setFilteredButtons(filtered);
  }, [searchText]);

  return (
    <View style={styles.container}>
      <Image source={require('../Image/logo.png')} style={styles.logo} />
      <ScrollView>
        <TextInput
          style={styles.searchBar}
          placeholder="Tìm kiếm đơn vị và danh mục"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Text style={styles.title}>Thông dụng</Text>
        <View style={styles.grid}>
          {filteredButtons.map((btn, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => navigation.navigate('Calculators', { type: btn.type })}
            >
              {btn.icon}
              <Text style={styles.buttonText}>{btn.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Thanh điều hướng dưới cùng */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Entypo name="home" size={24} color="black" />
          <Text style={styles.navText}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Calculator')}
        >
          <Entypo name="calculator" size={24} color="black" />
          <Text style={styles.navText}>Máy tính</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  logo: {
    width: 250,
    height: 80,
    marginBottom: 20,
    alignSelf: 'center',
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
});
