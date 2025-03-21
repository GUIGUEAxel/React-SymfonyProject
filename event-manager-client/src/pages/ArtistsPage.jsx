import React, { useState, useEffect } from 'react';
import { Container, Heading, Grid, Box, Spinner, Text, Center, Input, InputGroup, InputLeftElement, VStack, useColorModeValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';
import ArtistCard from '../components/ArtistCard';

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        console.log("Tentative de récupération des artistes depuis: http://localhost:8000/api/artists");
        
        const response = await axios.get('http://localhost:8000/api/artists');
        console.log("Réponse complète:", response);
        
        // Vérifiez la structure des données reçues
        if (response.data && Array.isArray(response.data['hydra:member'])) {
          console.log("Structure hydra détectée, utilisation de hydra:member");
          setArtists(response.data['hydra:member']);
        } else if (Array.isArray(response.data)) {
          console.log("Tableau d'artistes détecté");
          setArtists(response.data);
        } else {
          console.log("Structure inconnue, utilisation des données brutes");
          setArtists(Array.isArray(response.data) ? response.data : []);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des artistes:", err);
        setError("Impossible de charger les artistes. Veuillez réessayer plus tard.");
        // Initialisez artists à un tableau vide en cas d'erreur
        setArtists([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArtists();
  }, []);
  
  // Filtrer les artistes selon la recherche
  const filteredArtists = artists.filter(artist => 
    artist && artist.name && artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="center" justify="center" minH="60vh">
          <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
          <Text>Chargement des artistes...</Text>
        </VStack>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box textAlign="center" p={8} bg="red.50" rounded="md">
          <Heading size="md" mb={4} color="red.500">
            Erreur
          </Heading>
          <Text>{error}</Text>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" mb={6}>
          Découvrez nos artistes
        </Heading>
        
        <InputGroup mb={6}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Rechercher un artiste..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bg={useColorModeValue('white', 'gray.800')}
            border="1px solid"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            _focus={{
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
            }}
          />
        </InputGroup>
        
        {artists.length === 0 ? (
          <Box textAlign="center" p={10} bg={useColorModeValue('gray.50', 'gray.700')} rounded="md">
            <Text fontSize="lg">Aucun artiste trouvé.</Text>
          </Box>
        ) : filteredArtists.length === 0 ? (
          <Box textAlign="center" p={10} bg={useColorModeValue('gray.50', 'gray.700')} rounded="md">
            <Text fontSize="lg">Aucun résultat pour "{searchTerm}"</Text>
          </Box>
        ) : (
          <Grid 
            templateColumns={{ 
              base: "repeat(1, 1fr)", 
              md: "repeat(2, 1fr)", 
              lg: "repeat(3, 1fr)" 
            }} 
            gap={6}
          >
            {filteredArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </Grid>
        )}
        
      </VStack>
    </Container>
  );
};

export default ArtistsPage;
