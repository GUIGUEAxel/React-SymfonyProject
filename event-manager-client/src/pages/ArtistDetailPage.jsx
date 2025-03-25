import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, Heading, Text, Image, Divider, SimpleGrid, 
  Spinner, Center, Badge, VStack, HStack, Button, 
  Input, InputGroup, InputLeftElement, Flex, Spacer,
  useColorModeValue, Icon, Tooltip
} from '@chakra-ui/react';
import { SearchIcon, ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import { FaSortAlphaDown, FaSortAlphaUp, FaSort } from 'react-icons/fa';
import EventCard from '../components/EventCard'; // Assurez-vous d'avoir ce composant

const ArtistDetailPage = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Couleurs pour les boutons actifs/inactifs
  const activeColor = "blue";
  const inactiveColor = "gray";
  
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/artists/${id}`);
        setArtist(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération de l'artiste:", err);
        setError("Impossible de charger les détails de l'artiste");
      } finally {
        setLoading(false);
      }
    };
    
    fetchArtist();
  }, [id]);
  
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
  
  // Filtrer et trier les événements
  const sortAndFilterEvents = (events = []) => {
    // Filtrer selon la recherche
    let result = events.filter(event =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
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
  
  // Utiliser cette couleur pour le texte sur les fonds sombres
  const iconColor = useColorModeValue("black", "white");
  
  if (loading) {
    return (
      <Center h="200px">
        <Spinner size="xl" />
      </Center>
    );
  }
  
  if (error) {
    return (
      <Box textAlign="center" py={10}>
        <Heading as="h2" size="lg" color="red.500">
          {error}
        </Heading>
      </Box>
    );
  }
  
  // Vérifiez si artist existe avant d'utiliser ses propriétés
  if (!artist) {
    return (
      <Box textAlign="center" py={10}>
        <Heading as="h2" size="lg">
          Artiste non trouvé
        </Heading>
      </Box>
    );
  }
  
  // À ce stade, artist est garanti d'être défini
  // Vérifiez les propriétés spécifiques avant d'y accéder
  const events = artist.events || [];
  const genres = artist.genres || [];
  
  // Filtrer et trier les événements
  const filteredAndSortedEvents = sortAndFilterEvents(events);
  
  return (
    <Box>
      <Box mb={8} textAlign="center">
        <Image 
          src={artist.imageUrl || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
          alt={artist.name}
          borderRadius="full"
          boxSize="200px"
          mx="auto"
          objectFit="cover"
          mb={4}
        />
        <Heading as="h1" size="xl">{artist.name}</Heading>
        <Text fontSize="lg" color="gray.600" mt={2}>{artist.description}</Text>
        
        <HStack spacing={2} justify="center" mt={4}>
          {genres.map((genre, index) => (
            <Badge key={index} colorScheme="teal" fontSize="0.8em" py={1} px={2}>
              {genre}
            </Badge>
          ))}
        </HStack>
      </Box>
      
      <Divider my={6} />
      
      <Box mb={8}>
        <Heading as="h2" size="lg" mb={4}>Événements à venir de l'artiste</Heading>

        {events.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Text>Aucun événement à venir pour cet artiste</Text>
          </Box>
        ) : filteredAndSortedEvents.length === 0 ? (
          <Box textAlign="center" p={10} bg={useColorModeValue('gray.50', 'gray.700')} rounded="md">
            <Text fontSize="lg">Aucun résultat pour votre recherche</Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredAndSortedEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default ArtistDetailPage;
