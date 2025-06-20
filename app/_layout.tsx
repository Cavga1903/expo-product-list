import '../global.css';
import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FavoritesProvider } from './favoritesContext';
import { Text as RNText } from 'react-native';
import { CartProvider } from './cartContext';
import BottomTabBar from '../components/BottomTabBar';

export default function Layout() {
  const [loaded] = useFonts({
    'Savate-Regular': require('../assets/Fonts/Savate-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <CartProvider>
      <FavoritesProvider>
        <Tabs
          tabBar={props => <BottomTabBar {...props} />}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'home') iconName = 'home';
              else if (route.name === 'favorites') iconName = 'heart';
              else if (route.name === 'cart') iconName = 'cart';
              else if (route.name === 'profile') iconName = 'person';
              return <Ionicons name={iconName as any} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#7e22ce',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
            tabBarLabel: ({ focused, color }) => (
              <RNText style={{ fontFamily: 'Savate-Regular', color: '#111', fontSize: 16, fontWeight: 'bold' }}>{route.name === 'home' ? 'Anasayfa' : route.name === 'favorites' ? 'Favorilerim' : route.name === 'cart' ? 'Sepetim' : route.name === 'profile' ? 'Hesabım' : route.name}</RNText>
            ),
          })}
        >
          <Tabs.Screen name="home" options={{ title: 'Anasayfa' }} />
          <Tabs.Screen name="favorites" options={{ title: 'Favorilerim' }} />
          <Tabs.Screen name="cart" options={{ title: 'Sepetim' }} />
          <Tabs.Screen name="profile" options={{ title: 'Hesabım' }} />
        </Tabs>
      </FavoritesProvider>
    </CartProvider>
  );
}
