import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RNCamera } from 'react-native-camera';

interface Props {
  onTakeCamera: (uri?: string) => void
  status: boolean
}

interface State {
  typeCamera: any
}

export class CameraApp extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state ={
      typeCamera: RNCamera.Constants.Type.back
    }
  }

  render() {

    const PendingView = () => (
      <View style={styles.pending}><Text>Carregando...</Text></View>
    );

    const status = this.props.status;

    const cameraMode = () => {
      if(this.state.typeCamera === RNCamera.Constants.Type.front) {
        this.setState({typeCamera: RNCamera.Constants.Type.back})
      } else {
        this.setState({typeCamera: RNCamera.Constants.Type.front})
      }
    }

    return (
      <View>
        {status &&
          <View style={styles.container}>
            <RNCamera
              captureAudio={false}
              style={styles.preview}
              type={this.state.typeCamera}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            >
              {({ camera, status }) => {
                if (status !== 'READY') return <PendingView />;
                return (
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => cameraMode()} style={styles.capture}>
                      <Text style={{ fontSize: 14 }}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                      <Text style={{ fontSize: 14 }}>Fotografar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.cancel()} style={styles.capture}>
                      <Text style={{ fontSize: 14 }}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            </RNCamera>

          </View>}
      </View>
    );
  }

  takePicture = async (camera) => {
    const { onTakeCamera } = this.props;
    const options = { quality: 0.5, base64: true };
    try {
      const data = await camera.takePictureAsync(options);
      onTakeCamera(data.uri);
    } catch (error) {
      console.error(error);
    }
  };

  cancel = async () => {
    const { onTakeCamera } = this.props;
    onTakeCamera()
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 0,
    height: 600
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  pending: {
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center'
  },
});