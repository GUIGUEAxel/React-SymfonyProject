import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, Heading, Text, Image, Divider, SimpleGrid, 
  Spinner, Center, Badge, VStack, HStack, Button 
} from '@chakra-ui/react';

const ArtistDetailPage = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
  
  // À ce stade, artist est garantit d'être défini
  // Vérifiez les propriétés spécifiques avant d'y accéder
  const events = artist.events || [];
  const genres = artist.genres || [];
  
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
        <Heading as="h2" size="lg" mb={4}>Événements à venir</Heading>
        {events.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {events.map(event => (
              <Box 
                key={event.id} 
                borderWidth="1px" 
                borderRadius="lg" 
                overflow="hidden" 
                _hover={{ shadow: "md" }}
              >
                <Image 
                  src={event.imageUrl || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
                  alt={event.name}
                  h="200px"
                  w="100%"
                  objectFit="cover"
                />
                <Box p={4}>
                  <Heading as="h3" size="md">{event.name}</Heading>
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    {new Date(event.date).toLocaleDateString()}
                  </Text>
                  <Text mt={2} noOfLines={2}>{event.description}</Text>
                  <Button mt={3} colorScheme="blue" size="sm">
                    Voir détails
                  </Button>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Box textAlign="center" py={4}>
            <Text>Aucun événement à venir pour cet artiste</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ArtistDetailPage;
