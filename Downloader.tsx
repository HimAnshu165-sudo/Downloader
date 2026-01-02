import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import RNFetchBlob from 'react-native-blob-util';

const Downloader = () => {
  const [pastedUrl, setPastedUrl] = useState('');

  // 🔐 Permission handler
  const requestPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return true;

    // Android 13+
    if (Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    // Android 12 and below
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  // ⬇️ VIDEO download logic
  const downloadVideo = async () => {
    try {
      if (!pastedUrl) {
        Alert.alert('Error', 'Please enter video URL');
        return;
      }

      const hasPermission = await requestPermission();
      if (!hasPermission) {
        Alert.alert('Permission denied');
        return;
      }

      const { fs, config } = RNFetchBlob;
      const movieDir = fs.dirs.MovieDir;

      const filePath = `${movieDir}/video_${Date.now()}.mp4`;

      const options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: filePath,
          description: 'Downloading video',
          mime: 'video/mp4',
          mediaScannable: true,
        },
      };

      config(options)
        .fetch('GET', pastedUrl)
        .then((res: any) => {
          console.log('Video saved to:', res.path());
          Alert.alert('Success', 'Video downloaded');
        })
        .catch((err: any) => {
          console.log('DOWNLOAD ERROR:', err);
          Alert.alert('Error', 'Video download failed');
        });

    } catch (error) {
      console.log('ERROR:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <TextInput
        value={pastedUrl}
        onChangeText={txt => setPastedUrl(txt)}
        placeholder="Enter video URL (.mp4)"
        style={{
          width: '100%',
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
        }}
      />

      <TouchableOpacity
        onPress={downloadVideo}
        style={{
          paddingHorizontal: 24,
          paddingVertical: 12,
          backgroundColor: '#222',
          borderRadius: 8,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 18 }}>
          Download Video
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Downloader;
