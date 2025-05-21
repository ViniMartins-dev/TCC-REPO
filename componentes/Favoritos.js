import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import styles from "./styles";
import logo from "../assets/Logo-laranja.png";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Favoritos = ({ navigation }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);

useEffect(() => {
  const fetchFavoritos = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const id = await AsyncStorage.getItem("id");

      if (!token || !id) {
        console.warn("Token ou ID ausente. Faça login novamente.");
        return;
      }

      console.log("Token:", token);
      console.log("ID usado na requisição:", id);

      const response = await axios.get(
        `http://10.0.2.2:3000/api/favoritos/listar/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFavoritos(response.data);
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
      Alert.alert("Erro", "Não foi possível carregar os favoritos.");
    }
  };

  fetchFavoritos();
}, []);



  return (
    <View style={styles.container}>
      {menuVisible && <View style={styles.blurBackground} />}

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image source={logo} style={styles.logo} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Text style={styles.menuButton}>☰</Text>
        </TouchableOpacity>

        {menuVisible && (
          <View style={styles.menuDropdown}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
                setMenuVisible(false);
              }}
            >
              <Text style={styles.menuItem}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Favoritos");
                setMenuVisible(false);
              }}
            >
              <Text style={styles.menuItem}>Favoritos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Perfil");
                setMenuVisible(false);
              }}
            >
              <Text style={styles.menuItem}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
                setMenuVisible(false);
              }}
            >
              <Text style={styles.menuItem}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMenuVisible(false)}>
              <Text style={styles.menuItem}>Fechar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image source={require("../assets/gato.jpg")} style={styles.bannerImage} />
        <Text style={styles.bannerText}>Lista de favoritos</Text>
      </View>

      {/* Lista de favoritos */}
      <ScrollView contentContainerStyle={styles.favoritesList}>
        {favoritos.length === 0 ? (
          <Text style={styles.emptyText}>Você ainda não favoritou nenhum animal.</Text>
        ) : (
          favoritos.map((animal) => (
            <TouchableOpacity key={animal.id} style={styles.favoriteCard}>
              <Image
                source={{ uri: animal.imagem_url }}
                style={styles.favoriteImage}
              />
              <TouchableOpacity style={styles.modalHeartIcon}>
                <Text style={styles.heartIcon}>❤️</Text>
              </TouchableOpacity>
              <View style={styles.favoriteInfo}>
                <Text style={styles.favoriteName}>Nome: {animal.nome}</Text>
                <Text style={styles.favoriteDetail}>Raça: {animal.raca}</Text>
                <Text style={styles.favoriteDetail}>Idade: {animal.idade}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Favoritos;
