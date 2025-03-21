import React, { useState, useEffect } from 'react';
import { Container, Heading, Grid, Box, Spinner, Text, Center, Input, InputGroup, InputLeftElement, VStack, useColorModeValue, Select, Flex, SimpleGrid } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';
import EventCard from '../components/EventCard';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("Tentative de récupération des événements depuis: http://localhost:8000/api/events");
        
        const response = await axios.get('http://localhost:8000/api/events');
        console.log("Réponse complète:", response);
        console.log("Données reçues:", response.data);
        
        // Vérifiez la structure des données reçues
        if (response.data && Array.isArray(response.data['hydra:member'])) {
          console.log("Structure hydra détectée, utilisation de hydra:member");
          setEvents(response.data['hydra:member']);
        } else if (Array.isArray(response.data)) {
          console.log("Tableau d'événements détecté");
          setEvents(response.data);
        } else {
          console.log("Structure inconnue, utilisation des données brutes");
          // Assurez-vous d'initialiser events à un tableau vide si les données sont invalides
          setEvents(Array.isArray(response.data) ? response.data : []);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des événements:", err);
        setError("Impossible de charger les événements. Veuillez réessayer plus tard.");
        // Initialisez events à un tableau vide en cas d'erreur
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);
  
  // Filtrer les événements selon la recherche et le type
  const filteredEvents = events.filter(event => {
    const matchesSearch = event && event.name && 
      event.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
      (event && event.type && event.type.toLowerCase() === filter.toLowerCase());
    
    return matchesSearch && matchesFilter;
  });
  
  // Extraire tous les types d'événements uniques
  const eventTypes = ['all', ...new Set(
    events
      .filter(event => event && event.type)
      .map(event => event.type.toLowerCase())
  )];
  
  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="center" justify="center" minH="60vh">
          <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
          <Text>Chargement des événements...</Text>
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
          Événements à venir
        </Heading>
        
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          gap={4} 
          mb={6}
        >
          <InputGroup flex="3">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Rechercher un événement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg={useColorModeValue('white', 'gray.800')}
              border="1px solid"
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            />
          </InputGroup>
          
        </Flex>
        
        {events.length === 0 ? (
          <Box textAlign="center" p={10} bg={useColorModeValue('gray.50', 'gray.700')} rounded="md">
            <Text fontSize="lg">Aucun événement trouvé.</Text>
          </Box>
        ) : filteredEvents.length === 0 ? (
          <Box textAlign="center" p={10} bg={useColorModeValue('gray.50', 'gray.700')} rounded="md">
            <Text fontSize="lg">Aucun résultat pour votre recherche</Text>
          </Box>
        ) : (
          <SimpleGrid 
            columns={{ 
              base: 1, 
              md: 2, 
              lg: 3 
            }} 
            spacing={6}
          >
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </SimpleGrid>
        )}
        
      </VStack>
    </Container>
  );
};

export default EventsPage;
