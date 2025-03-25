import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Flex,
  Icon,
  Stack,
  Image,
  useColorModeValue
} from '@chakra-ui/react';
import { FaMusic, FaCalendarAlt, FaTicketAlt, FaArrowRight } from 'react-icons/fa';

const Feature = ({ title, text, icon }) => {
  return (
    <Stack align="center" textAlign="center">
      <Flex
        w={16}
        h={16}
        align="center"
        justify="center"
        color="white"
        rounded="full"
        bg="blue.500"
        mb={4}
      >
        <Icon as={icon} w={8} h={8} />
      </Flex>
      <Heading fontSize="xl" mb={2}>{title}</Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>{text}</Text>
    </Stack>
  );
};

const HomePage = () => {
  return (
    <Box>
      <Box
        bgImage="url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        position="relative"
        py={20}
        mb={12}
        borderRadius="lg"
        overflow="hidden"
      >
        <Box 
          position="absolute" 
          top={0} 
          left={0} 
          w="100%" 
          h="100%" 
          bg="blackAlpha.700"
        />
        <Container maxW="container.xl" position="relative" zIndex={2}>
          <Stack spacing={6} textAlign={{ base: 'center', md: 'left' }} align={{ base: 'center', md: 'flex-start' }}>
            <Heading
              fontWeight="bold"
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
              lineHeight="shorter"
              color="white"
              className="fade-in"
            >
              Découvrez les meilleurs événements musicaux
            </Heading>
            <Text
              color="gray.200"
              fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
              maxW="650px"
              className="fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              Planifiez vos sorties, découvrez de nouveaux artistes et ne manquez aucun événement grâce à notre plateforme dédiée aux passionnés de musique.
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} className="fade-in" style={{ animationDelay: '0.4s' }}>
              <Button
                as={RouterLink}
                to="/events"
                size="lg"
                colorScheme="blue"
                rightIcon={<FaArrowRight />}
              >
                Voir les événements
              </Button>
              <Button
                as={RouterLink}
                to="/artists"
                size="lg"
                variant="outline"
                color="white"
                _hover={{ bg: 'whiteAlpha.200' }}
                borderColor="white"
              >
                Découvrir les artistes
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Box py={16}>
        <Container maxW="container.xl" textAlign="center">
          <Heading mb={4}>Prêt à découvrir votre prochain événement musical ?</Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')} mb={8} maxW="800px" mx="auto">
            Ne manquez aucun événement.
          </Text>
          <Button
            as={RouterLink}
            to="/events"
            colorScheme="blue"
            size="lg"
            px={8}
            py={6}
            fontSize="md"
            shadow="lg"
          >
            Explorez les événements
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
