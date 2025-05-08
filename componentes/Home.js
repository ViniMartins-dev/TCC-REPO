import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
} from "react-native";
import styles from "./styles";
import Icon from 'react-native-vector-icons/FontAwesome';  // Importe o ícone de coração
import logo from '../assets/Logo-laranja.png';  // ajuste o caminho conforme sua estrutura

const Home = ({ navigation }) => {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [search, setSearch] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);  // Estado para favoritos

  const animals = [
    {
      id: 1,
      name: "Bolt",
      image: require("../assets/gato.jpg"),
      age: "3",
      type: "Cachorro",
      breed: "Labrador",
      sex: "M",
      personality: "Energético e carinhoso",
      description: "Cachorro brincalhão e amigável, adora correr.",
    },
    {
      id: 2,
      name: "Mia",
      image: require("../assets/gato2.jpg"),
      age: "2",
      type: "Gato",
      breed: "Siamês",
      sex: "F",
      personality: "Calma e observadora",
      description: "Gata que adora um colo e ambientes tranquilos.",
    },
  ];

  const filteredAnimals = animals.filter(
    (a) =>
      search === "" ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.breed.toLowerCase().includes(search.toLowerCase())
  );

  const clearFilters = () => {
    setSearch("");
  };

  const handleFilterClick = () => {
    setFilterVisible(!filterVisible);
  };

  const menuToggle = () => {
    setMenuVisible(!menuVisible);
    console.log(menuVisible);
  };

  const toggleFavorite = (animal) => {
    const isFavorite = favorites.some((fav) => fav.id === animal.id);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== animal.id));
    } else {
      setFavorites([...favorites, animal]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Topo */}
      <View style={styles.topBar}>
  
  {/* Alinhar Barra de Pesquisa e Ícone de Menu */}
  <View style={styles.topBarRight}>
  <Image source={logo} style={styles.logo} />
  <View style={styles.searchContainer}>
  <TextInput
    style={styles.searchBar}
    placeholder="Buscar por nome ou raça..."
    value={search}
    onChangeText={setSearch}
    placeholderTextColor="#888"
  />
  <Icon name="search" size={18} color="#888" style={styles.searchIcon} />
</View>
    
    {/* Ícone do Menu */}
    <TouchableOpacity onPress={menuToggle} style={styles.menuButtonContainer}>
      <Text style={styles.menuButton}>☰</Text>
    </TouchableOpacity>
  </View>
  
  {/* Menu Dropdown */}
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

      {/* Filtros rápidos */}
      <View style={styles.filterTags}>
        {["carinhoso", "observadora", "Energético"].map((tag, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tagButton}
            onPress={() => setSearch(tag)}
          >
            <Text style={styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.tagButton} onPress={handleFilterClick}>
          <Text style={styles.tagText}>Filtros</Text>
        </TouchableOpacity>
      </View>

      {/* Menu de Filtros Expansível */}
      {filterVisible && (
        <View style={styles.filterContainer}>
          <ScrollView style={{ maxHeight: 300 }}>
            <Text style={styles.filterSectionTitle}>▼ Cachorro</Text>
            <View style={styles.filterGroup}>
              {[
                "Labrador",
                "Golden Retriever",
                "Poodle",
                "Bulldog Francês",
                "Husky Siberiano",
              ].map((breed, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSearch(breed)}
                  style={[
                    styles.filterButtonTag,
                    search === breed && styles.selectedTag,
                  ]}
                >
                  <Text>{breed}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterSectionTitle}>▼ Gatos</Text>
            <View style={styles.filterGroup}>
              {[
                "Persa",
                "Siamês",
                "Maine Coon",
                "Ragdoll",
                "British Shorthair",
              ].map((breed, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSearch(breed)}
                  style={[
                    styles.filterButtonTag,
                    search === breed && styles.selectedTag,
                  ]}
                >
                  <Text>{breed}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
              <Text style={styles.clearText}>Limpar Filtros</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* Lista de animais */}
      <ScrollView contentContainerStyle={styles.animalList}>
        {filteredAnimals.map((animal) => (
          <TouchableOpacity
            key={animal.id}
            style={styles.favoriteCard}
            onPress={() => setSelectedAnimal(animal)}
          >
            <Image source={animal.image} style={styles.favoriteImage} />
            <View style={styles.cardContent}>
              <Text style={styles.animalName}>Nome: {animal.name}</Text>
              <Text style={styles.animalBreed}>Idade: {animal.age}</Text>
              <Text style={styles.animalBreed}>Raça: {animal.breed}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal polaroid */}
      {selectedAnimal && (
        <Modal
        animationType="slide"
        transparent
        visible={!!selectedAnimal}
        onRequestClose={() => setSelectedAnimal(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            <View style={styles.modalImageContainer}>
              <Image source={selectedAnimal.image} style={styles.modalImage} />
              <TouchableOpacity style={styles.modalHeartIcon}>
                <Text style={styles.heartIcon}>❤️</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Nome: {selectedAnimal.name}</Text>
              <Text style={styles.modalText}>Idade: {selectedAnimal.age}</Text>
              <Text style={styles.modalText}>Raça: {selectedAnimal.breed}</Text>
              <Text style={styles.modalText}>Tipo: {selectedAnimal.type}</Text>
              <Text style={styles.modalText}>
                <Text style={{ fontWeight: "bold" }}>Comportamento:</Text> {selectedAnimal.behavior}
              </Text>
              <Text style={styles.modalText}>
                <Text style={{ fontWeight: "bold" }}>Personalidade:</Text> {selectedAnimal.personality}
              </Text>
              <Text style={styles.modalText}>
                <Text style={{ fontWeight: "bold" }}>Descrição:</Text> {selectedAnimal.description}
              </Text>
              <TouchableOpacity
                onPress={() => setSelectedAnimal(null)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      )}
    </View>
  );
};

export default Home;