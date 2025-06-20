import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/35.jpg' }}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 16, borderWidth: 2, borderColor: '#7e22ce' }}
        />
        <Text style={{ fontFamily: 'Savate-Regular', fontSize: 22, fontWeight: 'bold', color: '#111', marginBottom: 4 }}>Tolga Kullanıcı</Text>
        <Text style={{ fontFamily: 'Savate-Regular', fontSize: 16, color: '#666', marginBottom: 16 }}>tolga@example.com</Text>
        <TouchableOpacity style={{ backgroundColor: '#7e22ce', borderRadius: 24, paddingVertical: 10, paddingHorizontal: 32, marginBottom: 32 }}>
          <Text style={{ color: '#fff', fontFamily: 'Savate-Regular', fontSize: 16, fontWeight: 'bold' }}>Çıkış Yap</Text>
        </TouchableOpacity>
        <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 20, marginTop: 16, width: '90%', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Savate-Regular', fontSize: 18, fontWeight: 'bold', color: '#7e22ce', marginBottom: 8 }}>Uygulama Hakkında</Text>
          <Text style={{ fontFamily: 'Savate-Regular', fontSize: 15, color: '#333', textAlign: 'center' }}>
            Bu uygulama Expo + React Native ile hazırlanmış örnek bir ürün listeleme ve alışveriş uygulamasıdır. Sepet, favoriler ve profil gibi temel özellikler içerir.
          </Text>
        </View>
        <View style={{ backgroundColor: '#fef3c7', borderRadius: 16, padding: 18, marginTop: 18, width: '90%', alignItems: 'flex-start', borderWidth: 1, borderColor: '#fde68a' }}>
          <Text style={{ fontFamily: 'Savate-Regular', fontSize: 16, fontWeight: 'bold', color: '#b45309', marginBottom: 6 }}>Türkçe Klavye Bilgilendirmesi</Text>
          <Text style={{ fontFamily: 'Savate-Regular', fontSize: 14, color: '#92400e', marginBottom: 4 }}>
            Türkçe karakterler (ü, ö, ç, ı, ş, ğ) kullanabilmek için cihazınızda Türkçe klavye aktif olmalıdır.
          </Text>
          <Text style={{ fontFamily: 'Savate-Regular', fontSize: 14, color: '#92400e', marginBottom: 2 }}>
            iOS: Ayarlar {'>'} Genel {'>'} Klavye {'>'} Klavyeler {'>'} Yeni Klavye Ekle {'>'} Türkçe
          </Text>
          <Text style={{ fontFamily: 'Savate-Regular', fontSize: 14, color: '#92400e', marginBottom: 2 }}>
            Android: Ayarlar {'>'} Sistem {'>'} Diller ve giriş {'>'} Klavye {'>'} Klavyeler {'>'} Klavye ekle {'>'} Türkçe
          </Text>
          <Text style={{ fontFamily: 'Savate-Regular', fontSize: 13, color: '#b45309', marginTop: 6 }}>
            Klavyenizden &apos;ü&apos; harfi yerine &apos;]&apos; gibi semboller çıkıyorsa, lütfen cihaz ayarlarından Türkçe klavye ekleyin.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
} 