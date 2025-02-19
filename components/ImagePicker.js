import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState, useContext } from "react";
import OutlinedButton from "./ui/OutlinedButton";
import { ThemeContext } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../theme/colors";

const ImagePicker = ({ onChangeImage }) => {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermission, requestPermission] = useCameraPermissions();
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  const verifyPermissions = async () => {
    if (cameraPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission!",
        "You need to grant camera permission to use in this app."
      );

      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) return;

    const img = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    setPickedImage(img.assets[0].uri);
    onChangeImage(img.assets[0].uri);
  };

  let imagePreview = <Text>No Image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View
        style={[styles.imagePreview, { backgroundColor: currentTheme.button }]}
      >
        {imagePreview}
      </View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 250,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
