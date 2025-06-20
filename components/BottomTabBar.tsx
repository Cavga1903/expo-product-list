import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EdgeInsets } from 'react-native-safe-area-context';

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  insets: EdgeInsets;
}

const TAB_CONFIG = {
  home: { label: 'Anasayfa', icon: 'home', iconOutline: 'home-outline' },
  favorites: { label: 'Favorilerim', icon: 'heart', iconOutline: 'heart-outline' },
  cart: { label: 'Sepetim', icon: 'cart', iconOutline: 'cart-outline' },
  profile: { label: 'Hesabım', icon: 'person', iconOutline: 'person-outline' },
};

export default function BottomTabBar({ state, descriptors, navigation, insets }: TabBarProps) {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e0e0e0', height: 60 + (insets?.bottom || 0), paddingBottom: insets?.bottom || 0, shadowColor: '#000', shadowOffset: { width: 0, height: -1 }, shadowOpacity: 0.08, shadowRadius: 2, elevation: 8, zIndex: 10, justifyContent: 'space-around', alignItems: 'center' }}>
      {state.routes.map((route: any, index: number) => {
        const tabKey = route.name as keyof typeof TAB_CONFIG;
        if (!TAB_CONFIG[tabKey]) return null; // Only render known tabs
        const { label, icon, iconOutline } = TAB_CONFIG[tabKey];
        const isFocused = state.index === index;
        const color = isFocused ? '#7e22ce' : 'gray';
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={descriptors[route.key]?.options.tabBarAccessibilityLabel}
            testID={descriptors[route.key]?.options.tabBarTestID}
            onPress={() => {
              if (!isFocused) navigation.navigate(route.name);
            }}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            activeOpacity={0.7}
          >
            <Ionicons name={isFocused ? (icon as any) : (iconOutline as any)} size={26} color={color} />
            <Text style={{ fontFamily: 'Savate-Regular', color: '#111', fontSize: 16, fontWeight: 'bold', marginTop: 2 }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}