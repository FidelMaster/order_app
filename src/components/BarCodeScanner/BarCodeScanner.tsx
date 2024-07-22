import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';


interface Props {
    /**
    * Funcion para capturar el texto inscrito en el codigo de barra.
    */
    onChangeValue: (value:string) => void;
}

const BarCodeScann = ({ onChangeValue }: Props) => {
    return (
        <RNCamera
           // ref={ref => { this.camera = ref; }}
            captureAudio={false}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            defaultTouchToFocus
            flashMode={RNCamera.Constants.FlashMode.off}
            mirrorImage={false}
            // onBarCodeRead={readBarcode}
          
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
                //console.log(barcodes, barcodes.length)
                if (barcodes.length > 0) {
                    onChangeValue(barcodes[0].data)
                   // setBarType(barcodes[0].format)
                }
            }}
            style={{
                margin:10,
                alignSelf:'center',
                justifyContent: 'flex-end',
                alignItems: 'center',
                height: 200,
                width: 200 
            }}
            type={RNCamera.Constants.Type.back}
            androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
        />
    )
   
};

export default BarCodeScann;