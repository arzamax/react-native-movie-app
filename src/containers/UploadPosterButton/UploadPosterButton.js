import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, Text, View } from 'react-native';
import Dialog from 'react-native-dialog';
import ImagePicker from 'react-native-image-crop-picker';

import { setMoviePoster } from "../../store/actions";

import { styles } from "./styles";

class UploadPosterButton extends PureComponent {

    state = {
        isDialogVisible: false
    };

    handleClickUploadButton = () => {
        this.setState({
            isDialogVisible: true
        })
    };

    addPosterFromDevice = async type => {
        const { setMoviePoster, movieId } = this.props;

        try {
            const image = await ImagePicker[type]({
                width: 300,
                height: 400,
                cropping: true
            });

            setMoviePoster({ [movieId]: image.path });
            this.setState({
                isDialogVisible: false
            })
        }
        catch (e) {}
    };

    handleClickOpenGalleryButton = () => this.addPosterFromDevice('openPicker');

    handleClickOpenCameraButton = () => this.addPosterFromDevice('openCamera');

    handleClickDialogCancel = () => {
        this.setState({
            isDialogVisible: false
        })
    };

    render() {
        const { isDialogVisible } = this.state;

        return (
            <View>
                <TouchableOpacity
                    onPress={this.handleClickUploadButton}
                    style={styles.uploadButton}
                >
                    <Text style={styles.uploadButtonText}>
                        Upload poster
                    </Text>
                </TouchableOpacity>
                <Dialog.Container visible={isDialogVisible}>
                    <Dialog.Title>Upload poster</Dialog.Title>
                    <Dialog.Button label="Camera" onPress={this.handleClickOpenCameraButton} />
                    <Dialog.Button label="Gallery" onPress={this.handleClickOpenGalleryButton} />
                    <Dialog.Button label="Cancel" onPress={this.handleClickDialogCancel} />
                </Dialog.Container>
            </View>
        )
    }
}

export default connect(null, { setMoviePoster })(UploadPosterButton);