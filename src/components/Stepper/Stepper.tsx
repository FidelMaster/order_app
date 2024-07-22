import React, { FC, useState, ReactElement } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ViewStyle,
    TextStyle,
    ScrollView,
    StyleSheet
} from 'react-native';

export interface StepperProps {
    active: number;
    textBackButton?: string;
    textNextButton?: string;
    content: ReactElement[];
    onNext: Function;
    onBack: Function;
    onFinish: Function;
    wrapperStyle?: ViewStyle;
    stepStyle?: ViewStyle;
    stepTextStyle?: TextStyle;
    buttonStyle?: ViewStyle;
    buttonTextStyle?: TextStyle;
    showButton?: boolean;
}

const search = (keyName: number, myArray: number[]): boolean => {
    let value = false;
    myArray.map((val) => {
        if (val === keyName) {
            value = true;
        }
    });
    return value;
};

/**
 * Componente dinamico para formularios.
 * TODO: Mejorar la reutilizacion y adicion de propiedades para los estilos
 * @param props 
 * @returns 
 */

const Stepper: FC<StepperProps> = (props) => {
    const {
        active,
        textBackButton,
        textNextButton,
        content,
        onBack,
        onNext,
        onFinish,
        wrapperStyle,
        stepStyle,
        stepTextStyle,
        buttonStyle,
        buttonTextStyle,
        showButton = true,
    } = props;

    const [step, setStep] = useState<number[]>([0]);
    
    const pushData = (val: number) => {
        setStep((prev) => [...prev, val]);
    };

    const removeData = () => {
        setStep((prev) => {
            prev.pop();
            return prev;
        });
    };

    return (
        <View style={wrapperStyle}>
            <View style={[styles.rowContainer, styles.center]}>
                {content.map((_, i) => {
                    return (
                        <React.Fragment key={i}>
                            {i !== 0 && (
                                <View
                                    style={{
                                        flex: 1,
                                        height: 1,
                                        backgroundColor: 'grey',
                                        opacity: 1,
                                        marginHorizontal: 10,
                                    }}
                                />
                            )}
                            <View
                                style={[
                                    {
                                        backgroundColor: '#1976d2',
                                        width: 30,
                                        height: 30,
                                        borderRadius: 30,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        opacity: search(i, step) ? 1 : 0.3,
                                    },
                                    stepStyle,
                                ]}>
                                {search(i, step) ? (
                                    <Text
                                        style={[
                                            {
                                                color: 'white',
                                            },
                                            stepTextStyle,
                                        ]}>
                                        &#10003;
                                    </Text>
                                ) : (
                                    <Text
                                        style={[
                                            { color: 'white' },
                                            stepTextStyle,
                                        ]}>
                                        {i + 1}
                                    </Text>
                                )}
                            </View>
                        </React.Fragment>
                    );
                })}
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {content[active]}
            </ScrollView>
            {showButton && (
                <View style={[styles.rowContainer, styles.center, { margin: 20 }]}>
                    {active !== 0 && (
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    marginRight: 10,
                                },
                                buttonStyle,
                                {
                                    backgroundColor: '#E1EBFA',
                                },
                            ]}
                            onPress={() => {
                                removeData();
                                onBack();
                            }}>
                            <Text style={[{ color: '#307CE6' }, buttonTextStyle]}>{textBackButton}</Text>
                        </TouchableOpacity>
                    )}
                    {content.length - 1 !== active && (
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor: '#01579B',
                                    marginRight: 10,
                                },
                                buttonStyle,
                            ]}
                            onPress={() => {
                                pushData(active + 1);
                                onNext();
                            }}>
                            <Text style={[{ color: 'white' }, buttonTextStyle]}>{textNextButton}</Text>
                        </TouchableOpacity>
                    )}
                    {content.length - 1 === active && (
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor: '#0EC12F',
                                },
                                buttonStyle,
                            ]}
                            onPress={() => onFinish()}>
                            <Text style={[{ color: 'white' }, buttonTextStyle]}>Finalizar</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    rowContainer: {
        flexDirection: 'row',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    step: {
        backgroundColor: '#1976d2',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepText: {
        color: 'white',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'grey',
        marginHorizontal: 10,
    },
    buttonContainer: {
        margin: 20,
    },
    button: {
        padding: 10,
        borderRadius: 4,
        height: 48,
        justifyContent: 'center',
    },
    backButton: {
        backgroundColor: '#E1EBFA',
        marginRight: 10,
    },
    nextButton: {
        backgroundColor: '#01579B',
        marginRight: 10,
    },
    finishButton: {
        backgroundColor: '#0EC12F',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Stepper;
