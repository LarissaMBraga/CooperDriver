import React from 'react';
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <WebView
      source={{ uri: 'https://larissambraga.github.io/CooperDriver/' }} 
      style={{ flex: 1 }}
    />
  );
}
