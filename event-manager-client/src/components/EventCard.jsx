import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Text, Heading, Stack, Badge, Link, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTag } from 'react-icons/fa';

const EventCard = ({ event }) => {
  // Formatage de la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // Utilise date ou dateEvent selon ce qui est disponible
    const dateToFormat = event.date || event.dateEvent;
    return dateToFormat ? new Date(dateToFormat).toLocaleDateString('fr-FR', options) : 'Date non définie';
  };

  // Formatage de l'heure
  const formatTime = (dateString) => {
    // Utilise date ou dateEvent selon ce qui est disponible
    const dateToFormat = event.date || event.dateEvent;
    if (!dateToFormat) return 'Heure non définie';
    
    const date = new Date(dateToFormat);
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
        <Box p={5}>
          <Stack spacing={2}>
            <Flex justify="space-between" align="center">
              {event.type && (
                <Badge colorScheme={getBadgeColor(event.type)} px={2} py={1} rounded="md">
                  {event.type}
                </Badge>
              )}
              {/* Suppression de la mention "Gratuit" */}
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
              <Text fontSize="sm">{formatDate(event.date || event.dateEvent)}</Text>
            </Flex>
            
            <Flex align="center" color={useColorModeValue('gray.600', 'gray.400')}>  
              <Icon as={FaClock} w={4} h={4} mr={1} />
              <Text fontSize="sm">{formatTime(event.date || event.dateEvent)}</Text>
            </Flex>
              
            <Flex align="center" color={useColorModeValue('gray.600', 'gray.400')}>
              <Icon as={FaMapMarkerAlt} w={4} h={4} mr={1} />
              <Text fontSize="sm" noOfLines={1}>{event.location}</Text>
            </Flex>
            
            <Box mt={3}>
              <Text 
                fontWeight="bold" 
                color={useColorModeValue('gray.700', 'gray.300')} 
                fontSize="sm"
              >
                Description :
              </Text>
              <Text 
                noOfLines={2} 
                color={useColorModeValue('gray.600', 'gray.400')} 
                fontSize="sm"
              >
                {event.description}
              </Text>
            </Box>
          </Stack>
        </Box>
      </Link>
    </Box>
  );
};

export default EventCard;
