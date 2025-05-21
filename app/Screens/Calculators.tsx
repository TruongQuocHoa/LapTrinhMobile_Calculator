import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const units = {
  length: {
    mm: 1,
    cm: 10,
    m: 1000,
    km: 1000000,
    in: 25.4,
    ft: 304.8,
    yd: 914.4,
    mi: 1609344,
  },
  weight: {
    mg: 1,
    g: 1000,
    kg: 1000000,
    t: 1000000000,
    lb: 453592.37,
    oz: 28349.5,
  },
  temperature: {
    C: { toK: (c) => c + 273.15, fromK: (k) => k - 273.15 },
    F: { toK: (f) => (f - 32) * 5 / 9 + 273.15, fromK: (k) => (k - 273.15) * 9 / 5 + 32 },
    K: { toK: (k) => k, fromK: (k) => k },
  },
  volume: {
    ml: 1,
    l: 1000,
    m3: 1000000,
    cm3: 1,
    gal: 3785.41,
  },
  time: {
    sec: 1,
    min: 60,
    hr: 3600,
    day: 86400,
  },
  speed: {
    'm/s': 1,
    'km/h': 0.277778,
    'mi/h': 0.44704,
    'ft/s': 0.3048,
  },
};

const calculatorButtons = [
  ['AC', '()', '%', '/'],
  ['7', '8', '9', 'X'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', ',', '<-', '='],
];
const screenWidth = Dimensions.get('window').width;
const BUTTON_MARGIN = 5;
const BUTTONS_PER_ROW = 5;
const buttonSize = (screenWidth - (BUTTON_MARGIN * (BUTTONS_PER_ROW + 1))) / BUTTONS_PER_ROW + 6;

export default function Calculators() {
  const route = useRoute();
  const navigation = useNavigation();

  const type = route.params?.type;
  const currentUnits = units[type] || {};

  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState(Object.keys(currentUnits)[0]);
  const [toUnit, setToUnit] = useState(Object.keys(currentUnits)[1] || Object.keys(currentUnits)[0]);
  const [result, setResult] = useState('');
  
  const handleButtonPress = (value) => {
    if (value === 'AC') {
      setInputValue('');
    } else if (value === '<-') {
      setInputValue(inputValue.slice(0, -1));
    } else if (value === '=') {
      try {
        const expression = inputValue.replace(/X/g, '*');
        // eslint-disable-next-line no-eval
        const evalResult = eval(expression);
        setInputValue(String(evalResult));
      } catch {
        setInputValue('Lỗi');
      }
    } else {
      setInputValue(inputValue === '' ? value : inputValue + value);
    }
  };

  useEffect(() => {
    handleConvert(inputValue, fromUnit, toUnit);
  }, [inputValue, fromUnit, toUnit]);

  const handleConvert = (value, from, to) => {
    if (!value || isNaN(value)) {
      setResult('');
      return;
    }

    const parsedValue = parseFloat(value);

    if (type === 'temperature') {
      const toKelvin = units.temperature[from].toK(parsedValue);
      const converted = units.temperature[to].fromK(toKelvin);
      setResult(converted.toFixed(2));
    } else {
      const baseValue = parsedValue * currentUnits[from];
      const converted = baseValue / currentUnits[to];
      setResult(converted.toFixed(4));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Máy Tính</Text>
      </View>

      <View style={styles.displayArea}>
        <Text style={styles.resultText}>{result || '0'}</Text>
      </View>

      <View style={styles.pickers}>
        <Picker
          selectedValue={fromUnit}
          onValueChange={(itemValue) => setFromUnit(itemValue)}
          style={styles.picker}
        >
          {Object.keys(currentUnits).map(unit => (
            <Picker.Item key={unit} label={unit} value={unit} />
          ))}
        </Picker>

        <Ionicons name="arrow-forward" size={24} color="black" style={{ marginHorizontal: 10 }} />

        <Picker
          selectedValue={toUnit}
          onValueChange={(itemValue) => setToUnit(itemValue)}
          style={styles.picker}
        >
          {Object.keys(currentUnits).map(unit => (
            <Picker.Item key={unit} label={unit} value={unit} />
          ))}
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nhập giá trị"
        keyboardType="numeric"
        value={inputValue}
        onChangeText={setInputValue}
      />

      <View style={styles.buttons}>
        {calculatorButtons.map((row, index) => (
          <View key={index} style={styles.row}>
            {row.map((btn) => (
              <TouchableOpacity
                key={btn}
                style={[
                  styles.button,
                  btn === 'AC' ? styles.acButton
                    : btn === '=' ? styles.equalsButton
                      : /[()%X/+\-=]/.test(btn) ? styles.operatorButton
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
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  displayArea: {
    backgroundColor: '#e5e5e5',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    height: 160,
    justifyContent: 'space-between',
  },
  resultText: {
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginTop: 35,
  },
  pickers: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  picker: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  input: {
    fontSize: 18,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
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
    marginHorizontal: BUTTON_MARGIN,
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
