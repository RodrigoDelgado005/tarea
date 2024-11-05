import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Estangasions = () => {
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const response = await fetch('http://192.168.1.48/rn4/datos.php');
        const data = await response.json();
        setEquipos(data);
      } catch (error) {
        console.error('Error al obtener los equipos:', error);
      }
    };

    fetchEquipos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Estangaship League</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <Feather name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bellIcon}>
              <Feather name="bell" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Win Today Card */}
        <TouchableOpacity style={styles.winTodayCard}>
          <View style={styles.winTodayContent}>
            <Text style={styles.winTodayTitle}>El Actual Campeon</Text>
            <Text style={styles.winTodaySubtitle}>
              En la Edicion 2023, River Plate{"\n"}se consagro Campeon
            </Text>
          </View>
          <Image
            source={require('/RN4/rn4/assets/images/img1.png')}
            style={styles.trophyImage}
          />
        </TouchableOpacity>

        {/* Popular Categories */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Popular Categories</Text>
          <View style={styles.categoriesContainer}>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryButtonText}>Home Sure</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryButtonText}>Big Win</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryButtonText}>Sure Tips</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Matches */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Upcoming Matches</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {equipos.map((equipo, index) => (
              <TouchableOpacity key={index} style={styles.matchCard}>
                <Text style={styles.categoryName}>{equipo.nombre}</Text>
                <Image
                  source={{ uri: equipo.escudo_url }} // Utiliza la URL del escudo
                  style={styles.teamLogo}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellIcon: {
    marginLeft: 16,
  },
  winTodayCard: {
    backgroundColor: '#2A2A5A',
    margin: 16,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  winTodayTitle: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  winTodaySubtitle: {
    color: '#CCCCCC',
    fontSize: 18,
    marginBottom: 60,
  },
  trophyImage: {
    width: 110,
    height: 160,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  categoryButton: {
    backgroundColor: '#2A2A5A',
    padding: 12,
    borderRadius: 12,
    flex: 1,
  },
  categoryButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  matchCard: {
    backgroundColor: '#0052CC',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 150,
  },
  categoryName: {
    color: 'white',
    fontSize: 14,
    marginBottom: 12,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  teamLogo: {
    width: 30,
    height: 30,
  },
  matchText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Estangasions;