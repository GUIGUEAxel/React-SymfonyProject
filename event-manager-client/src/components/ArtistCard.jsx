import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Image, Text, Heading, Stack, Badge, Link, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaMusic, FaGlobe, FaUser } from 'react-icons/fa';

const ArtistCard = ({ artist }) => {
  // Image par défaut si aucune n'est fournie
  const defaultImage = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';

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
        to={`/artists/${artist.id}`}
        _hover={{ textDecoration: 'none' }}
      >
        <Box h="200px" overflow="hidden">
          <Image
            src={artist.image || defaultImage}
            alt={artist.name}
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
              <Badge colorScheme="blue" px={2} py={1} rounded="md">
                {artist.style || 'Artiste'}
              </Badge>
            </Flex>
            
            <Heading 
              as="h3" 
              size="md" 
              fontWeight="semibold"
              noOfLines={1}
              color={useColorModeValue('gray.700', 'white')}
            >
              {artist.name}
            </Heading>
            
            {artist.country && (
              <Flex align="center" color={useColorModeValue('gray.600', 'gray.400')}>
                <Icon as={FaGlobe} w={4} h={4} mr={1} />
                <Text fontSize="sm">{artist.country}</Text>
              </Flex>
            )}
              
            {artist.style && (
              <Flex align="center" color={useColorModeValue('gray.600', 'gray.400')}>
                <Icon as={FaMusic} w={4} h={4} mr={1} />
                <Text fontSize="sm">{artist.style}</Text>
              </Flex>
            )}
            
            <Text noOfLines={3} color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm" mt={1}>
              {artist.description || "Aucune description disponible pour cet artiste."}
            </Text>
          </Stack>
        </Box>
      </Link>
    </Box>
  );
};

export default ArtistCard;
