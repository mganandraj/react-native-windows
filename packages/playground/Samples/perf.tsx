import * as React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

import {
  AppRegistry,
  TouchableHighlight,
} from 'react-native';

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

class CalcButton extends React.Component {
    render() {
        return (
            <TouchableHighlight
                style={[
                    calcstyles.button,
                    !isNaN(Number(this.props.name)) && calcstyles.buttonNumeric,
                ]}
                onPress={() => this.props.onPress(this.props.name)}>
                <Text style={calcstyles.buttonText}>{this.props.name}</Text>
            </TouchableHighlight>
        );
    }
}

const calcstyles = StyleSheet.create({
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
  });class Calculator0 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator0</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator1 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator1</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator2 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator2</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator3 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator3</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator4 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator4</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator5 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator5</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator6 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator6</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator7 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator7</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator8 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator8</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator9 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator9</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator10 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator10</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator11 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator11</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator12 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator12</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator13 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator13</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator14 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator14</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator15 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator15</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator16 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator16</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator17 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator17</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator18 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator18</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator19 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator19</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator20 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator20</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator21 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator21</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator22 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator22</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator23 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator23</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator24 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator24</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator25 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator25</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator26 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator26</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator27 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator27</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator28 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator28</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator29 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator29</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator30 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator30</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator31 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator31</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator32 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator32</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator33 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator33</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator34 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator34</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator35 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator35</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator36 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator36</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator37 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator37</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator38 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator38</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator39 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator39</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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
class Calculator40 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator40</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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


class Calculator41 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator41</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator42 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator42</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator43 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator43</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator44 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator44</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator45 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator45</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator46 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator46</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator47 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator47</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator48 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator48</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator49 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator49</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator50 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator50</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator51 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator51</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator52 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator52</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator53 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator53</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator54 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator54</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator55 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator55</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator56 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator56</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator57 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator57</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator58 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator58</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator59 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator59</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator60 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator60</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator61 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator61</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator62 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator62</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator63 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator63</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator64 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator64</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator65 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator65</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator66 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator66</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator67 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator67</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator68 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator68</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator69 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator69</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator70 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator70</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator71 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator71</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator72 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator72</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator73 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator73</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator74 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator74</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator75 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator75</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator76 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator76</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator77 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator77</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator78 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator78</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator79 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator79</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator80 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator80</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator81 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator81</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator82 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator82</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator83 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator83</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator84 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator84</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator85 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator85</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator86 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator86</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator87 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator87</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator88 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator88</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator89 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator89</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator90 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator90</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator91 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator91</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator92 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator92</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator93 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator93</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator94 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator94</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator95 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator95</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator96 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator96</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator97 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator97</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator98 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator98</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

class Calculator99 extends React.Component {
    state = {
        displayText: '0',
    };

    // Existing high cyclomatic complexity
    // eslint-disable-next-line complexity
    buttonPress(btn) {
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

                    this.setState({ displayText: text });
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
                this.setState({ displayText: String(num) });
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
                this.setState({ displayText: calc.stackValue });
            }
        } else if (btn === operators.equals) {
            // Equals
            if (isFinite(Number(text))) {
                this.computeAndUpdate(btn);
                this.setState({ displayText: calc.stackValue });
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
                this.setState({ displayText: String(Number(text)) });
            }
        } else {
            // Error
        }
    }

    clearEntry() {
        calc.decimalPressed = false;
        calc.showingPreviousResult = false;
        this.setState({ displayText: '0' });
    }

    computeAndUpdate(nextOperator) {
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
            <View style={calcstyles.container}>
                <Text>Calculator99</Text>
                <View style={calcstyles.textRow}>
                    <Text style={calcstyles.text}>{this.state.displayText}</Text>
                </View>
                <View style={calcstyles.buttonRow}>
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
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="7" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="8" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="9" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.multiply}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="4" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="5" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="6" onPress={n => this.buttonPress(n)} />
                    <CalcButton
                        name={operators.subtract}
                        onPress={n => this.buttonPress(n)}
                    />
                </View>
                <View style={calcstyles.buttonRow}>
                    <CalcButton name="1" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="2" onPress={n => this.buttonPress(n)} />
                    <CalcButton name="3" onPress={n => this.buttonPress(n)} />
                    <CalcButton name={operators.add} onPress={n => this.buttonPress(n)} />
                </View>
                <View style={calcstyles.buttonRow}>
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

// var Calcs=[Calculator0, Calculator1, Calculator2, Calculator3, Calculator4, Calculator5, Calculator6, Calculator7, Calculator8, Calculator9, Calculator10, Calculator11, Calculator12, Calculator13, Calculator14, Calculator15, Calculator16, Calculator17, Calculator18, Calculator19, Calculator20, Calculator21, Calculator22, Calculator23, Calculator24, Calculator25, Calculator26, Calculator27, Calculator28, Calculator29, Calculator30, Calculator31, Calculator32, Calculator33, Calculator34, Calculator35, Calculator36, Calculator37, Calculator38, Calculator39, Calculator40, Calculator41, Calculator42, Calculator43, Calculator44, Calculator45, Calculator46, Calculator47, Calculator48, Calculator49, Calculator50, Calculator51, Calculator52, Calculator53, Calculator54, Calculator55, Calculator56, Calculator57, Calculator58, Calculator59, Calculator60, Calculator61, Calculator62, Calculator63, Calculator64, Calculator65, Calculator66, Calculator67, Calculator68, Calculator69, Calculator70, Calculator71, Calculator72, Calculator73, Calculator74, Calculator75, Calculator76, Calculator77, Calculator78, Calculator79, Calculator80, Calculator81, Calculator82, Calculator83, Calculator84, Calculator85, Calculator86, Calculator87, Calculator88, Calculator89, Calculator90, Calculator91, Calculator92, Calculator93, Calculator94, Calculator95, Calculator96, Calculator97, Calculator98, Calculator99];
// var Calcs=[Calculator0, Calculator1, Calculator2, Calculator3, Calculator4, Calculator5, Calculator6, Calculator7, Calculator8, Calculator9, Calculator10];
var Calcs=[Calculator0, Calculator1, Calculator2, Calculator3, Calculator4, Calculator5, Calculator6, Calculator7, Calculator8, Calculator9, Calculator10, Calculator11, Calculator12, Calculator13, Calculator14, Calculator15, Calculator16, Calculator17, Calculator18, Calculator19, Calculator20, Calculator21, Calculator22, Calculator23, Calculator24, Calculator25, Calculator26, Calculator27, Calculator28, Calculator29, Calculator30, Calculator31, Calculator32, Calculator33, Calculator34, Calculator35, Calculator36, Calculator37, Calculator38, Calculator39, Calculator40, Calculator41, Calculator42, Calculator43, Calculator44, Calculator45, Calculator46, Calculator47, Calculator48, Calculator49, Calculator50];

export default class Bootstrap extends React.Component {
  constructor() {
    super();
    // this.state = {child: [Calculator]}
    this.state = {numCalcs: 0}
    this.socket = new WebSocket('ws://localhost:8080/');
    this.queue = []
    this.socket.onopen = () => {};
    this.socket.onmessage = (e) => {};
    this.socket.onerror = (e) => {};
    this.socket.onclose = (e) => {};
  }

  doSend2(msg) {
    this.socket.send(msg)
  }

  doSend(msg) {
    if(this.socket.readyState != WebSocket.OPEN) {
        this.queue.push(msg)
        return;
    }

    if (this.queue.length >0 ) {
        this.queue.forEach(function(item, index, array) {
            this.doSend2(item)
        }, this)
        this.queue = []
    }

    this.doSend2(msg)
  }

  componentDidMount() {
    var prologue = nativeGetPrologue();
    var notes = {};
    if(global.HermesInternal) {
        notes['HermesInternalRuntimeProps'] = global.HermesInternal.getRuntimeProperties();
        // notes['HBCCommand'] = '-O -output-source-map';
        notes['HBCCommand'] = '-O -output-source-map AllocInOld';
        // notes['HBCCommand'] = '-O -output-source-map -fstrip-function-names -Wno-undefined-variable -non-strict -fno-enable-tdz'
    }
    
    prologue['notes'] = notes;
    this.doSend(JSON.stringify(prologue));
    let memInfo2 = nativeGetProcessMemoryInfo();
    let memInfo = { ...memInfo2 }
    memInfo['step'] = this.state.numCalcs;
    memInfo['TimeFromStart'] = memInfo['TimeStamp'] - memInfo['StartTimeStamp'];
    this.doSend(JSON.stringify(memInfo));
    this.setState({numCalcs: this.state.numCalcs + 1})
  }

  componentDidUpdate() {
    host = this
    let memInfo2= nativeGetProcessMemoryInfo();
    let memInfo = { ...memInfo2 }
    memInfo['step'] = host.state.numCalcs;
    memInfo['TimeFromStart'] = memInfo['TimeStamp'] - memInfo['StartTimeStamp'];
    host.doSend(JSON.stringify(memInfo));
    if(host.state.numCalcs < Calcs.length) {
        setTimeout(function () {
            host.setState({numCalcs: Math.min(Calcs.length, host.state.numCalcs + 1)})
        }, 0);
    }
  }

  render() {
    return (
            <View>
                <Text>Memory Info</Text>
                <ScrollView style={styles.scrollView}>
                    { Calcs.slice(0, this.state.numCalcs).map(Item => (<Item />))}
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