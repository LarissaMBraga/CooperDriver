import React from 'react';
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <WebView
      source={{ uri: 'https://seu-servidor.com/index.html' }} // Ou um arquivo local
      style={{ flex: 1 }}
    />
  );
}
