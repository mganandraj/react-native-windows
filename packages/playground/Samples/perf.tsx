import * as React from 'react';
import { Alert,Button, ScrollView, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import {
  AppRegistry,
  TouchableHighlight,
} from 'react-native';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';


const operators = {
  clearEntry: 'CE',
  clear: 'C',
  backspace: '⌫',
  decimal: '.',
  sign: '±',
  add: '+',
  subtract: '−',
  multiply: '×',
  divide: '÷',
  equals: ':',
};

const calc = {
  stackValue: NaN,
  pendingOperator: '',
  decimalPressed: false,
  showingPreviousResult: false,
};

interface CalcButtonProps {
  name: string;
  onPress: (name: string) => void;
}

class CalcButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={[
          styles.button,
          !isNaN(Number(this.props.name)) && styles.buttonNumeric,
        ]}
        onPress={() => this.props.onPress(this.props.name)}>
        <Text style={styles.buttonText}>{this.props.name}</Text>
      </TouchableHighlight>
    );
  }
}

class Calculator extends React.Component {
  state = {
    displayText: '0',
  };

  // Existing high cyclomatic complexity
  // eslint-disable-next-line complexity
  buttonPress(btn: string) {
    let text = this.state.displayText;

    if (btn === operators.clearEntry) {
      // Clear entry
      this.clearEntry();
    } else if (btn === operators.clear) {
      // Clear
      calc.stackValue = NaN;
      calc.pendingOperator = '';
      this.clearEntry();
    } else if (btn === operators.backspace) {
      // Backspace
      if (calc.decimalPressed) {
        calc.decimalPressed = false;
      } else {
        if (isFinite(Number(text))) {
          text = text.substring(0, text.length - 1);

          if (text.length === 0) {
            text = '0';
          } else if (text.endsWith(operators.decimal)) {
            text = text.substring(0, text.length - 1);
          }

          this.setState({displayText: text});
        }
      }
    } else if (btn === operators.decimal) {
      // Decimal
      if (isFinite(Number(text))) {
        if (!calc.decimalPressed && !text.includes(operators.decimal)) {
          calc.decimalPressed = true;
        }
      }
    } else if (btn === operators.sign) {
      // Sign change
      if (isFinite(Number(text))) {
        let num = Number(text);
        num *= -1.0;
        this.setState({displayText: String(num)});
      }
    } else if (
      btn === operators.add ||
      btn === operators.subtract ||
      btn === operators.multiply ||
      btn === operators.divide
    ) {
      // Add, Subrtract, Multiply, or Divide
      if (isFinite(Number(text))) {
        this.computeAndUpdate(btn);
        this.setState({displayText: calc.stackValue});
      }
    } else if (btn === operators.equals) {
      // Equals
      if (isFinite(Number(text))) {
        this.computeAndUpdate(btn);
        this.setState({displayText: calc.stackValue});
        calc.stackValue = NaN;
      }
    } else if (!isNaN(Number(btn))) {
      // Number
      if (isFinite(Number(text))) {
        if (calc.showingPreviousResult) {
          text = '0';
          calc.showingPreviousResult = false;
        }

        if (calc.decimalPressed) {
          text += '.';
          calc.decimalPressed = false;
        }

        text += btn;
        this.setState({displayText: String(Number(text))});
      }
    } else {
      // Error
    }
  }

  clearEntry() {
    calc.decimalPressed = false;
    calc.showingPreviousResult = false;
    this.setState({displayText: '0'});
  }

  computeAndUpdate(nextOperator: string) {
    if (!isNaN(calc.stackValue)) {
      // There's something on the stack, let's compute
      let o1 = calc.stackValue;
      const o2 = Number(this.state.displayText);

      if (calc.pendingOperator === operators.add) {
        o1 = o1 + o2;
      } else if (calc.pendingOperator === operators.subtract) {
        o1 = o1 - o2;
      } else if (calc.pendingOperator === operators.multiply) {
        o1 = o1 * o2;
      } else if (calc.pendingOperator === operators.divide) {
        o1 = o1 / o2;
      }

      calc.stackValue = o1;
    } else {
      const num = Number(this.state.displayText);
      calc.stackValue = num;
    }
    calc.pendingOperator = nextOperator;
    calc.showingPreviousResult = true;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textRow}>
          <Text style={styles.text}>{this.state.displayText}</Text>
        </View>
        <View style={styles.buttonRow}>
          <CalcButton
            name={operators.clearEntry}
            onPress={n => this.buttonPress(n)}
          />
          <CalcButton
            name={operators.clear}
            onPress={n => this.buttonPress(n)}
          />
          <CalcButton
            name={operators.backspace}
            onPress={n => this.buttonPress(n)}
          />
          <CalcButton
            name={operators.divide}
            onPress={n => this.buttonPress(n)}
          />
        </View>
        <View style={styles.buttonRow}>
          <CalcButton name="7" onPress={n => this.buttonPress(n)} />
          <CalcButton name="8" onPress={n => this.buttonPress(n)} />
          <CalcButton name="9" onPress={n => this.buttonPress(n)} />
          <CalcButton
            name={operators.multiply}
            onPress={n => this.buttonPress(n)}
          />
        </View>
        <View style={styles.buttonRow}>
          <CalcButton name="4" onPress={n => this.buttonPress(n)} />
          <CalcButton name="5" onPress={n => this.buttonPress(n)} />
          <CalcButton name="6" onPress={n => this.buttonPress(n)} />
          <CalcButton
            name={operators.subtract}
            onPress={n => this.buttonPress(n)}
          />
        </View>
        <View style={styles.buttonRow}>
          <CalcButton name="1" onPress={n => this.buttonPress(n)} />
          <CalcButton name="2" onPress={n => this.buttonPress(n)} />
          <CalcButton name="3" onPress={n => this.buttonPress(n)} />
          <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
        </View>
        <View style={styles.buttonRow}>
          <CalcButton
            name={operators.sign}
            onPress={n => this.buttonPress(n)}
          />
          <CalcButton name="0" onPress={n => this.buttonPress(n)} />
          <CalcButton
            name={operators.decimal}
            onPress={n => this.buttonPress(n)}
          />
          <CalcButton
            name={operators.equals}
            onPress={n => this.buttonPress(n)}
          />
        </View>
      </View>
    );
  }
}


export default class Bootstrap extends React.Component {
  constructor() {
    super();
    this.state = {child: ['xyz']}
    this.socket = new WebSocket('ws://10.0.0.203:8080/');
    this.queue = []
    this.socket.onopen = () => {
        // connection opened
        // this.socket.send('something'); // send a message
        // Alert.alert('opened');
        this.socket.send('hello from RN app')
      };
      
      this.socket.onmessage = (e) => {
        // a message was received
        Alert.alert(e.data);
      };
      
      this.socket.onerror = (e) => {
        // an error occurred
        Alert.alert(e.message);
      };
      
      this.socket.onclose = (e) => {
        // connection closed
        Alert.alert(e.code, e.reason);
      };
      
  }

  doSend(msg) {
    if(this.socket.readyState != WebSocket.OPEN) {
        this.queue.push(msg)
        return;
    }

    if (this.queue.length >0 ) {
        this.queue.forEach(function(item, index, array) {
            this.socket.send(item)
        }, this)
        this.queue = []
    }

    this.socket.send(msg)
  }

  componentDidMount() {
    this.state.child.push('cdef')
    this.setState({child: this.state.child})
  }

  componentDidUpdate() {
    host = this
    this.doSend(JSON.stringify(nativeGetProcessMemoryInfo()))
    setTimeout(function () {
      host.state.child.push('cdef')
      host.setState({child: host.state.child})
    }, 2000)   
  }

  render() {
    return (
        <View>
            <Text>Memory Info</Text>
            <ScrollView style={styles.scrollView}>
            {this.state.child.map(item => (
                <Text style={styles.text}>
                    {item}
                </Text>
                // <Calculator />
            ))}           
            </ScrollView>
        </View>
    );
  };
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
    container: {
    flex: 1,
    backgroundColor: '#dddddd',
  },
  textRow: {
    padding: 5,
    alignItems: 'flex-end',
  },
  text: {
    padding: 5,
    fontSize: 36,
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  buttonNumeric: {
    backgroundColor: '#fcfcfc',
  },
  buttonText: {
    fontSize: 18,
  },
});

AppRegistry.registerComponent('Bootstrap', () => Bootstrap);