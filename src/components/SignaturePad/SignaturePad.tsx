import React, { useRef } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import SignatureScreen, { SignatureViewRef } from 'react-native-signature-canvas';

interface SignatureProps {
    text: string;
    onOK: (value: string) => void;
    onHandleClear: () => void;
    imgWidth: number;
    imgHeight: number;
}

const SignaturePad: React.FC<SignatureProps> = ({ text, onOK, onHandleClear, imgHeight, imgWidth }: SignatureProps) => {
    const ref = useRef<SignatureViewRef>();

    // Called after ref.current.readSignature() reads a non-empty base64 string
    const handleOK = (signature: string) => {
        onOK(signature); // Callback from Component props
    };

    // Called after ref.current.readSignature() reads an empty string
    const handleEmpty = () => {
     //   console.log("Empty");
    };

    // Called after ref.current.clearSignature()
    const handleClear = () => {
      //  console.log("clear success!");
        onHandleClear()
    };

    // Called after end of stroke
    const handleEnd = () => {
           // ref.current?.readSignature();
    };

    // Called after ref.current.getData()
    const handleData = (data) => {
       // console.log(data);
    };

    return (
        <View style={{ width: imgWidth, height: imgHeight }}>
            <SignatureScreen
                ref={ref}
                onEnd={handleEnd}
                onOK={handleOK}
                onEmpty={handleEmpty} 
                onGetData={handleData}
                onClear={handleClear}
                autoClear={true}
                overlayWidth={400}
                overlayHeight={400}
                webStyle={
                    `
                    .m-signature-pad--footer
                        .button {
                            background-color: red;
                            color: #FFF;
                        }
                `
                }
            />
        </View>

    );
};

export default SignaturePad;