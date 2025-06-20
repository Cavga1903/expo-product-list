import { View, Text, FlatList, SafeAreaView, Dimensions, ImageBackground, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useContext, useState, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FavoritesContext, Product } from './favoritesContext';
import { CartContext } from './cartContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 24;
const IMAGE_SOURCE = require('../assets/computer.png');

export default function HomeScreen() {
  const { favorites, toggleFavorite, products, setProducts } = useContext(FavoritesContext);
  const { addToCart } = useContext(CartContext);
  const [searchText, setSearchText] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();
      let allProducts = data;
      if (data.length < 10) {
        const dummyProducts: Product[] = Array.from({ length: 20 }).map((_, i) => ({
          id: 1000 + i,
          name: `Ürün ${i + 1}`,
          price: (i + 1) * 100,
          description: `Açıklama ${i + 1}`,
        }));
        allProducts = [
          ...data,
          ...dummyProducts.slice(0, 10 - data.length),
        ];
      }
      setProducts(allProducts);
    } catch (error) {
      const dummyProducts: Product[] = Array.from({ length: 10 }).map((_, i) => ({
        id: 1000 + i,
        name: `Ürün ${i + 1}`,
        price: (i + 1) * 100,
        description: `Açıklama ${i + 1}`,
      }));
      setProducts(dummyProducts);
      console.error('Veri çekme hatası:', error);
    }
  }, [setProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase()) ||
      item.price.toString().includes(searchText)
  );

  const horizontalProducts = filteredProducts.slice(0, 5);

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 90 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
          <Text style={{ fontSize: 36, fontWeight: '900', color: '#111', textAlign: 'left', fontFamily: 'Savate-Regular' }}>Ürünler</Text>
          <TextInput
            placeholder="Ürünlerde ara..."
            placeholderTextColor="#111"
            style={{ backgroundColor: '#fff', borderRadius: 12, padding: 12, fontSize: 20, marginBottom: 16, borderWidth: 1, borderColor: '#e5e7eb', fontFamily: 'Savate-Regular', color: '#111', fontWeight: 'bold' }}
            value={searchText}
            onChangeText={setSearchText}
            editable={true}
          />
        </View>
        <View style={{ paddingHorizontal: 16, marginVertical: 16 }}>
          <Text className="text-lg font-semibold mb-2">Popüler Ürünler</Text>
          <FlatList
            data={horizontalProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 0, paddingLeft: 8, paddingRight: 8, paddingVertical: 8 }}
          />
        </View>
        <View className="mb-4 mt-2 flex-row items-center justify-between">
          <Text className="text-lg font-semibold ml-4">Tüm Ürünler</Text>
        </View>
        <View className="mb-4 h-[1px] w-full bg-gray-300" />
        {filteredProducts.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500">Aramanıza uygun ürün bulunamadı.</Text>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start', marginHorizontal: 10 }}>
            {filteredProducts.map((item) => (
              <View key={item.id} style={{}}>
                {renderProduct({ item })}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
} 