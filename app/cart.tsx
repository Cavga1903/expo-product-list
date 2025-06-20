import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { CartContext, CartItem } from './cartContext';
import type { CartContextType } from './cartContext';

const IMAGE_SOURCE = require('../assets/computer.png');

export default function CartScreen() {
  const { cartProducts, removeFromCart, increaseQuantity, decreaseQuantity, getTotal } = useContext(CartContext) as CartContextType;

  const renderProduct = ({ item }: { item: CartItem }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, marginVertical: 8, marginHorizontal: 12, padding: 12, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { height: 1, width: 0 }, elevation: 2 }}>
      <Image
        source={IMAGE_SOURCE}
        style={{ width: 60, height: 60, borderRadius: 12, marginRight: 14, backgroundColor: '#f3f4f6' }}
        resizeMode="cover"
      />
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <Text style={{ fontFamily: 'Savate-Regular', fontSize: 15, fontWeight: 'bold', color: '#111', marginBottom: 2 }}>{item.product.name}</Text>
        <Text style={{ fontFamily: 'Savate-Regular', fontSize: 14, color: '#4ade80', fontWeight: 'bold', marginBottom: 2 }}>{item.product.price} TL</Text>
        <Text style={{ fontFamily: 'Savate-Regular', fontSize: 12, color: '#666', marginBottom: 4 }}>{item.product.description}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{ backgroundColor: '#f3f4f6', borderRadius: 12, width: 28, height: 28, alignItems: 'center', justifyContent: 'center', marginRight: 4 }}
            onPress={() => decreaseQuantity(item.product.id)}
          >
            <Ionicons name="remove" size={18} color="#111" />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Savate-Regular', fontSize: 16, minWidth: 20, textAlign: 'center' }}>{item.quantity}</Text>
          <TouchableOpacity
            style={{ backgroundColor: '#f3f4f6', borderRadius: 12, width: 28, height: 28, alignItems: 'center', justifyContent: 'center', marginLeft: 4 }}
            onPress={() => increaseQuantity(item.product.id)}
          >
            <Ionicons name="add" size={18} color="#111" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: '#fee2e2', borderRadius: 18, width: 32, height: 32, alignItems: 'center', justifyContent: 'center', marginLeft: 12 }}
            onPress={() => removeFromCart(item.product.id)}
          >
            <Ionicons name="trash" size={16} color="#dc2626" />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Savate-Regular', fontSize: 15, fontWeight: 'bold', color: '#4ade80', marginLeft: 12, minWidth: 60, textAlign: 'right' }}>
            {item.product.price * item.quantity} TL
          </Text>
        </View>
      </View>
    </View>
  );

  if (cartProducts.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: 'Savate-Regular', fontSize: 18, color: '#888' }}>Sepetinizde ürün yok.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <View style={{ paddingTop: 24, paddingBottom: 8, alignItems: 'center' }}>
        <Text style={{ fontFamily: 'Savate-Regular', fontSize: 28, fontWeight: 'bold', color: '#111' }}>Sepetim</Text>
      </View>
      <FlatList
        data={cartProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.product.id.toString()}
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
      />
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { height: -2, width: 0 }, elevation: 4 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Savate-Regular', fontSize: 20, fontWeight: 'bold', color: '#111' }}>Toplam Tutar</Text>
          <Text style={{ fontFamily: 'Savate-Regular', fontSize: 20, fontWeight: 'bold', color: '#4ade80' }}>{getTotal()} TL</Text>
        </View>
      </View>
    </SafeAreaView>
  );
} 