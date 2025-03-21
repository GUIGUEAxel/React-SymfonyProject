import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Image, Text, Heading, Stack, Badge, Link, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTag } from 'react-icons/fa';

const EventCard = ({ event }) => {
  // Formatage de la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Formatage de l'heure
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  // Couleurs pour les badges selon le type
  const getBadgeColor = (type) => {
    const types = {
      'Concert': 'purple',
      'Festival': 'green',
      'Conférence': 'blue',
      'Workshop': 'orange',
      'Exhibition': 'pink',
      'Other': 'gray'
    };
    
    return types[type] || 'gray';
  };

  // Image par défaut si aucune n'est fournie
  const defaultImage = 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';

  return (
    <Box 
      className="card"
      rounded="lg"
      overflow="hidden"
      bg={useColorModeValue('white', 'gray.800')}
      borderWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      transition="all 0.3s ease"
      _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
    >
      <Link 
        as={RouterLink} 
        to={`/events/${event.id}`}
        _hover={{ textDecoration: 'none' }}
      >
        <Box h="200px" overflow="hidden">
          <Image
            src={event.image || defaultImage}
            alt={event.name}
            w="100%"
            h="100%"
            objectFit="cover"
            transition="transform 0.5s"
            _hover={{ transform: 'scale(1.05)' }}
          />
        </Box>
        
        <Box p={5}>
          <Stack spacing={2}>
            <Flex justify="space-between" align="center">
              <Badge colorScheme={getBadgeColor(event.type)} px={2} py={1} rounded="md">
                {event.type}
              </Badge>
              <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                {event.price ? `${event.price} €` : 'Gratuit'}
              </Text>
            </Flex>
            
            <Heading 
              as="h3" 
              size="md" 
              fontWeight="semibold"
              noOfLines={2}
              color={useColorModeValue('gray.700', 'white')}
            >
              {event.name}
            </Heading>
            
            <Flex align="center" color={useColorModeValue('gray.600', 'gray.400')}>
              <Icon as={FaCalendarAlt} w={4} h={4} mr={1} />
              <Text fontSize="sm">{formatDate(event.dateEvent)}</Text>
            </Flex>
            
            <Flex align="center" color={useColorModeValue('gray.600', 'gray.400')}>  
              <Icon as={FaClock} w={4} h={4} mr={1} />
              <Text fontSize="sm">{formatTime(event.dateEvent)}</Text>
            </Flex>
              
            <Flex align="center" color={useColorModeValue('gray.600', 'gray.400')}>
              <Icon as={FaMapMarkerAlt} w={4} h={4} mr={1} />
              <Text fontSize="sm" noOfLines={1}>{event.location}</Text>
            </Flex>
            
            <Text noOfLines={2} color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm" mt={1}>
              {event.description}
            </Text>
          </Stack>
        </Box>
      </Link>
    </Box>
  );
};

export default EventCard;
