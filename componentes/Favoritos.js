import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal, ScrollView } from "react-native";
import styles from "./styles";
import logo from '../assets/Logo-laranja.png'; 

const Favoritos = ({ navigation }) => {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const favoritos = [
    {
      id: 1,
      name: "Bolt",
      image: require("../assets/cachorro.jpg"), // troque pela imagem correta
      breed: "Labrador",
      age: "3",
      behavior: "Energético e carinhoso",
      type: "Cachorro",
      personality: "Amigável e brincalhão",
      description: "Adora correr e brincar no parque"
    },
  ];

  return (
    <View style={styles.container}>
      {menuVisible && <View style={styles.blurBackground} />}

      {/* Top Bar */}
      <View style={styles.topBar}>
        
        
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={logo} style={styles.logo} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Text style={styles.menuButton}>☰</Text>
        </TouchableOpacity>

        {menuVisible && (
          <View style={styles.menuDropdown}>
            <TouchableOpacity onPress={() => {
              navigation.navigate("Home");
              setMenuVisible(false);
            }}>
              <Text style={styles.menuItem}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      navigation.navigate("Favoritos");
                      setMenuVisible(false);
                    }}>
                      <Text style={styles.menuItem}>Favoritos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      navigation.navigate("Perfil");
                      setMenuVisible(false);
                    }}>
              
              <TouchableOpacity onPress={() => {
                      navigation.navigate("Login");
                      setMenuVisible(false);
                    }}>
                      <Text style={styles.menuItem}>Login</Text>
                    </TouchableOpacity>
                      
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setMenuVisible(false)}>
                      <Text style={styles.menuItem}>Fechar</Text>
                    </TouchableOpacity>
                  </View>
        )}
      </View>

      {/* Banner com texto sobreposto */}
      <View style={styles.bannerContainer}>
        <Image source={require('../assets/gato.jpg')} style={styles.bannerImage} />
        <Text style={styles.bannerText}>Lista de favoritos</Text>
      </View>

      {/* Lista de favoritos */}
      <ScrollView contentContainerStyle={styles.favoritesList}>
        {favoritos.map(animal => (
          <TouchableOpacity
            key={animal.id}
            onPress={() => setSelectedAnimal(animal)}
            style={styles.favoriteCard}
          >
            <Image source={animal.image} style={styles.favoriteImage} />
            <TouchableOpacity style={styles.modalHeartIcon}>
            <Text style={styles.heartIcon}>❤️</Text>
          </TouchableOpacity>
            <View style={styles.favoriteInfo}>
              <Text style={styles.favoriteName}>Nome: {animal.name}</Text>
              <Text style={styles.favoriteDetail}>Raça: {animal.breed}</Text>
              <Text style={styles.favoriteDetail}>Idade: {animal.age}</Text>
            </View>
            <TouchableOpacity>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      

    </View>
  );
};

export default Favoritos;
