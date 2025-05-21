import { useHistory } from '@/hooks/HistoryContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const calculatorButtons = [
  ['AC', '()', '%', '/'],
  ['7', '8', '9', 'X'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', ',', '<-', '='],
];

const screenWidth = Dimensions.get('window').width;
const BUTTON_MARGIN = 10;
const BUTTONS_PER_ROW = 4;
const buttonSize = (screenWidth - BUTTON_MARGIN * (BUTTONS_PER_ROW + 1)) / BUTTONS_PER_ROW;

export default function CalculatorSimple() {
  const navigation = useNavigation();
  const [displayValue, setDisplayValue] = useState('0');
  const { addHistory } = useHistory();

  const handleButtonPress = (value: string) => {
    if (value === 'AC') {
      setDisplayValue('0');
    } else if (value === '<-') {
      setDisplayValue(displayValue.slice(0, -1) || '0');
    } else if (value === '=') {
      try {
        const expression = displayValue.replace('X', '*').replace(',', '.');
        const result = eval(expression).toString();
        addHistory({
          expression: displayValue,
          result,
          created_at: new Date().toISOString(),
        });
        setDisplayValue(result);
      } catch {
        setDisplayValue('Lỗi');
      }
    } else {
      setDisplayValue(displayValue === '0' ? value : displayValue + value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Máy Tính</Text>
      </View>

      <View style={styles.display}>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate('HistoryScreen')}
        >
          <Ionicons name="time-outline" size={24} color="#000" />
          <Text style={styles.historyText}>Lịch sử</Text>
        </TouchableOpacity>
        <Text style={styles.displayText}>{displayValue}</Text>
      </View>

      <View style={styles.buttons}>
        {calculatorButtons.map((row, index) => (
          <View key={index} style={styles.row}>
            {row.map((btn) => (
              <TouchableOpacity
                key={btn}
                style={[
                  styles.button,
                  btn === 'AC'
                    ? styles.acButton
                    : btn === '='
                    ? styles.equalsButton
                    : /[()%X/+\-=]/.test(btn)
                    ? styles.operatorButton
                    : {},
                ]}
                onPress={() => handleButtonPress(btn)}
              >
                {btn === '<-' ? (
                  <Ionicons name="backspace-outline" size={24} color="#000" />
                ) : (
                  <Text style={styles.buttonText}>{btn}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  },
  display: {
    height: 215,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  displayText: {
    fontSize: 32,
    textAlign: 'right',
    fontWeight: 'bold',
    marginTop: 10,
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  historyText: {
    marginLeft: 5,
  },
  buttons: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: BUTTON_MARGIN,
  },
  button: {
    width: buttonSize,
    height: buttonSize,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: BUTTON_MARGIN / 2,
  },
  acButton: {
    backgroundColor: '#FFA726',
  },
  operatorButton: {
    backgroundColor: '#C5FFB5',
  },
  equalsButton: {
    backgroundColor: '#C5FFB5',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
