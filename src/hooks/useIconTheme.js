import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ICON_THEME_KEY = 'ICON_THEME';

export const useIconTheme = () => {
  const [iconTheme, setIconTheme] = useState('default');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(ICON_THEME_KEY);
      if (saved) setIconTheme(saved);
    })();
  }, []);

  const changeTheme = async (theme) => {
    setIconTheme(theme);
    await AsyncStorage.setItem(ICON_THEME_KEY, theme);
  };

  return { iconTheme, changeTheme };
};
