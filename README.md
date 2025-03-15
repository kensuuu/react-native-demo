# Memo App

A simple memo application built with React Native and Expo.

## Features

- Memo List
- Create and Edit Memos
- Delete Individual Memos
- Delete All Memos

## Tech Stack

- [Expo](https://expo.dev)
- [React Native](https://reactnative.dev)
- [Expo Router](https://docs.expo.dev/router/introduction) - File-based routing
- [Zustand](https://zustand-demo.pmnd.rs) - State management
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) - Data persistence

## Setup

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## Project Structure

- `app/` - Main application code
  - `index.tsx` - Memo list screen
  - `edit.tsx` - Memo edit screen
- `components/` - Reusable components
- `hooks/` - Custom hooks
- `stores/` - State management
- `types/` - Type definitions
