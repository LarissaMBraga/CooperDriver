import React from 'react';
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <WebView
      source={{ uri: 'https://github.com/LarissaMBraga/CooperDriver/assets/index.html' }} 
      style={{ flex: 1 }}
    />
  );
}
