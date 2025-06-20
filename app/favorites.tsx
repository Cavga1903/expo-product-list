import { View, Text, FlatList, Dimensions, ImageBackground, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { useContext, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FavoritesContext, Product } from './favoritesContext';
import { CartContext } from './cartContext';

const IMAGE_SOURCE = require('../assets/computer.png');
const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 24;

export default function FavoritesScreen() {
  const { favoriteProducts, favorites, toggleFavorite } = useContext(FavoritesContext);
  const { addToCart } = useContext(CartContext);
  const [searchText, setSearchText] = useState('');

  // Arama filtresi
  const filteredFavorites = favoriteProducts.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase()) ||
      item.price.toString().includes(searchText)
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={{ width: CARD_WIDTH, margin: 6, height: 250, borderRadius: 16, overflow: 'hidden', backgroundColor: '#fff' }}>
      <ImageBackground
        source={IMAGE_SOURCE}
        style={{ flex: 1, borderTopLeftRadius: 16, borderTopRightRadius: 16, height: 170 }}
        imageStyle={{ resizeMode: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
      >
        <TouchableOpacity
          style={{ position: 'absolute', top: 12, right: 12, zIndex: 2, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 16, padding: 4 }}
          onPress={() => toggleFavorite(item.id)}
        >
          <Ionicons
            name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
            size={24}
            color={favorites.includes(item.id) ? '#e11d48' : '#aaa'}
          />
        </TouchableOpacity>
      </ImageBackground>
      <View style={{ backgroundColor: '#fff', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, padding: 10, flexDirection: 'row', alignItems: 'center', minHeight: 60 }}>
        <View style={{ flex: 1 }}>
          <Text className="mb-1 font-[Savate-Regular]" style={{ textAlign: 'left', color: '#111', fontSize: 14, fontWeight: 'bold', fontFamily: 'Savate-Regular' }}>{item.name}</Text>
          <Text className="mb-1 font-[Savate-Regular]" style={{ textAlign: 'left', color: '#4ade80', fontSize: 13, fontWeight: 'bold', fontFamily: 'Savate-Regular' }}>{item.price} TL</Text>
          <Text className="font-[Savate-Regular]" style={{ textAlign: 'left', color: '#666', fontSize: 12, fontWeight: 'bold', fontFamily: 'Savate-Regular' }}>{item.description}</Text>
        </View>
        <TouchableOpacity
          style={{ marginLeft: 8, backgroundColor: '#f3f4f6', borderRadius: 18, width: 32, height: 32, alignItems: 'center', justifyContent: 'center' }}
          onPress={() => addToCart(item)}
        >
          <Ionicons name="cart" size={16} color="#7e22ce" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (filteredFavorites.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
        <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
          <Text style={{ fontSize: 36, fontWeight: '900', color: '#111', textAlign: 'left', fontFamily: 'Savate-Regular' }}>Favoriler</Text>
          <TextInput
            placeholder="Favorilerde ara..."
            placeholderTextColor="#111"
            style={{ backgroundColor: '#fff', borderRadius: 12, padding: 12, fontSize: 20, marginBottom: 16, borderWidth: 1, borderColor: '#e5e7eb', fontFamily: 'Savate-Regular', color: '#111', fontWeight: 'bold' }}
            value={searchText}
            onChangeText={setSearchText}
            editable={true}
          />
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Aramanıza uygun favori ürün bulunamadı.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
        <Text style={{ fontSize: 36, fontWeight: '900', color: '#111', textAlign: 'left', fontFamily: 'Savate-Regular' }}>Favoriler</Text>
        <TextInput
          placeholder="Favorilerde ara..."
          placeholderTextColor="#111"
          style={{ backgroundColor: '#fff', borderRadius: 12, padding: 12, fontSize: 20, marginBottom: 16, borderWidth: 1, borderColor: '#e5e7eb', fontFamily: 'Savate-Regular', color: '#111', fontWeight: 'bold' }}
          value={searchText}
          onChangeText={setSearchText}
          editable={true}
        />
      </View>
      <FlatList
        data={filteredFavorites}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 90, marginHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
} 