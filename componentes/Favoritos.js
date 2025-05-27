import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import logo from "../assets/Logo-laranja.png";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Favoritos = ({ navigation }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const id = await AsyncStorage.getItem("id");

        if (!token || !id) {
          console.warn("Token ou ID ausente. Faça login novamente.");
          Alert.alert("Erro", "Você precisa estar logado para ver seus favoritos.");
          navigation.navigate("Login");
          return;
        }

        console.log("Token:", token.substring(0, 20) + "...");
        console.log("ID usado na requisição:", id);

        const response = await axios.get(
          `http://10.0.2.2:3000/favoritos/listar/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Resposta da API:", response.data);

        // Mapear os dados recebidos para o formato correto
        const favoritosMapeados = response.data.map(favorito => {
          const animal = favorito.animal;
          if (!animal) {
            console.log('Favorito sem dados do animal:', favorito);
            return null;
          }
          
          console.log('Mapeando animal:', animal);
          return {
            id: favorito.id,
            animal_id: animal.id,
            nome: animal.nome,
            raca: animal.raca,
            idade: animal.idade,
            especie: animal.especie,
            descricao: animal.descricao,
            personalidade: animal.personalidade,
            imagem_url: animal.fotoBase64 || 'https://via.placeholder.com/300'
          };
        }).filter(f => f !== null);

        console.log("Favoritos mapeados:", favoritosMapeados.length);
        if (favoritosMapeados.length > 0) {
          console.log("Exemplo do primeiro favorito:", favoritosMapeados[0]);
        }
        setFavoritos(favoritosMapeados);
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
        if (error.response) {
          console.log("Status:", error.response.status);
          console.log("Dados:", error.response.data);
        }
        Alert.alert("Erro", "Não foi possível carregar os favoritos.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritos();
  }, []);

  const removerFavorito = async (animalId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("id");

      if (!token || !userId) {
        Alert.alert("Erro", "Você precisa estar logado para remover favoritos.");
        return;
      }

      await axios.delete(
        `http://10.0.2.2:3000/favoritos/${animalId}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Atualiza a lista local removendo o favorito
      setFavoritos(favoritos.filter(fav => fav.animal_id !== animalId));
      Alert.alert("Sucesso", "Animal removido dos favoritos!");
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      Alert.alert("Erro", "Não foi possível remover o favorito.");
    }
  };

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
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B00" />
          <Text style={styles.loadingText}>Carregando favoritos...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.favoritesList}>
          {favoritos.length === 0 ? (
            <Text style={styles.emptyText}>Você ainda não favoritou nenhum animal.</Text>
          ) : (
            favoritos.map((animal) => (
              <TouchableOpacity key={animal.id} style={styles.favoriteCard}>
                <Image
                  source={{ uri: animal.imagem_url }}
                  style={styles.favoriteImage}
                  resizeMode="cover"
                />
                <TouchableOpacity 
                  style={styles.modalHeartIcon}
                  onPress={() => removerFavorito(animal.animal_id)}
                >
                  <Text style={styles.heartIcon}>❤️</Text>
                </TouchableOpacity>
                <View style={styles.favoriteInfo}>
                  <Text style={styles.favoriteName}>Nome: {animal.nome}</Text>
                  <Text style={styles.favoriteDetail}>Espécie: {animal.especie}</Text>
                  <Text style={styles.favoriteDetail}>Raça: {animal.raca}</Text>
                  <Text style={styles.favoriteDetail}>Idade: {animal.idade}</Text>
                  {animal.personalidade && (
                    <Text style={styles.favoriteDetail}>Personalidade: {animal.personalidade}</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default Favoritos;
