import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Heading, 
  Box, 
  Spinner, 
  Text, 
  Input, 
  InputGroup, 
  InputLeftElement, 
  VStack, 
  useColorModeValue, 
  Flex, 
  SimpleGrid,
  Button,
  HStack,
  Icon,
  Tooltip,
  Spacer
} from '@chakra-ui/react';
import { SearchIcon, ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import { FaSortAlphaDown, FaSortAlphaUp, FaCalendarAlt, FaSort } from 'react-icons/fa';
import axios from 'axios';
import EventCard from '../components/EventCard';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortField, setSortField] = useState('name'); // Champ de tri par défaut
  const [sortDirection, setSortDirection] = useState('asc'); // Direction de tri par défaut
  
  
  const activeColor = "blue"; 
  const inactiveColor = "gray";
  
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
  
  // Gestion du tri
  const handleSort = (field) => {
    if (sortField === field) {
      // Si on clique sur le même champ, on inverse la direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Si on change de champ de tri, on revient à l'ordre croissant par défaut
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Fonction pour obtenir l'icône de direction (toujours en noir)
  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <Icon as={FaSort} color="black" />;
    }
    
    if (field === 'name') {
      return sortDirection === 'asc' 
        ? <Icon as={FaSortAlphaDown} color="black" />
        : <Icon as={FaSortAlphaUp} color="black" />;
    } else {
      return sortDirection === 'asc' 
        ? <Icon as={ArrowUpIcon} color="black" />
        : <Icon as={ArrowDownIcon} color="black" />;
    }
  };
  
  // Filtrer et trier les événements
  const sortAndFilterEvents = () => {
    // Filtrer selon la recherche et le type
    let result = events.filter(event => {
      const matchesSearch = event && event.name && 
        event.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filter === 'all' || 
        (event && event.type && event.type.toLowerCase() === filter.toLowerCase());
      
      return matchesSearch && matchesFilter;
    });
    
    // Trier les résultats
    result = [...result].sort((a, b) => {
      if (sortField === 'name') {
        const nameA = (a.name || '').toLowerCase();
        const nameB = (b.name || '').toLowerCase();
        return sortDirection === 'asc' 
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      } else if (sortField === 'date') {
        // Utiliser la propriété date ou dateEvent, dépendant de votre structure de données
        const dateFieldA = a.date || a.dateEvent;
        const dateFieldB = b.date || b.dateEvent;
        
        // Si l'un des champs est indéfini, le mettre à la fin
        if (!dateFieldA) return sortDirection === 'asc' ? 1 : -1;
        if (!dateFieldB) return sortDirection === 'asc' ? -1 : 1;
        
        const dateA = new Date(dateFieldA);
        const dateB = new Date(dateFieldB);
        
        return sortDirection === 'asc' 
          ? dateA - dateB 
          : dateB - dateA;
      }
      return 0;
    });
    
    return result;
  };
  
  const filteredAndSortedEvents = sortAndFilterEvents();
  
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

  // Utiliser cette couleur pour le texte sur les fonds sombres
  const iconColor = useColorModeValue("black", "white");
  
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" mb={6}>
          Événements à venir
        </Heading>
        
        {/* Barre de recherche et boutons de tri dans le même Flex */}
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          gap={4} 
          mb={6}
          align="center"
        >
          <InputGroup>
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
          
          <Spacer display={{ base: 'none', md: 'block' }} />
          
          {/* Boutons de tri */}
          <HStack spacing={2} mt={{ base: 2, md: 0 }} w={{ base: '100%', md: 'auto' }}>
            <Text fontWeight="bold" display={{ base: 'none', md: 'block' }}>Trier par :</Text>
            <Tooltip label={`Trier par nom (${sortDirection === 'asc' ? 'A à Z' : 'Z à A'})`}>
              <Button 
                size="sm" 
                leftIcon={
                  sortField === 'name' 
                    ? <Icon as={sortDirection === 'asc' ? FaSortAlphaDown : FaSortAlphaUp} color={iconColor} /> 
                    : <Icon as={FaSort} color={iconColor} />
                }
                onClick={() => handleSort('name')}
                colorScheme={sortField === 'name' ? activeColor : inactiveColor}
                variant={sortField === 'name' ? 'solid' : 'outline'}
              >
                Nom
              </Button>
            </Tooltip>
            <Tooltip label={`Trier par date (${sortDirection === 'asc' ? 'anciennes à récentes' : 'récentes à anciennes'})`}>
              <Button 
                size="sm" 
                leftIcon={
                  sortField === 'date' 
                    ? <Icon as={sortDirection === 'asc' ? ArrowUpIcon : ArrowDownIcon} color={iconColor} /> 
                    : <Icon as={FaSort} color={iconColor} />
                }
                onClick={() => handleSort('date')}
                colorScheme={sortField === 'date' ? activeColor : inactiveColor}
                variant={sortField === 'date' ? 'solid' : 'outline'}
              >
                Date
              </Button>
            </Tooltip>
          </HStack>
        </Flex>
        
        {events.length === 0 ? (
          <Box textAlign="center" p={10} bg={useColorModeValue('gray.50', 'gray.700')} rounded="md">
            <Text fontSize="lg">Aucun événement trouvé.</Text>
          </Box>
        ) : filteredAndSortedEvents.length === 0 ? (
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
            {filteredAndSortedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </SimpleGrid>
        )}
        
      </VStack>
    </Container>
  );
};

export default EventsPage;
