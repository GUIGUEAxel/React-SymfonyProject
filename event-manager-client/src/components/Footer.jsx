import React from 'react';
import { Box, Container, Stack, Text, Link, useColorModeValue, Icon, Flex, HStack, Divider } from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram, FaGithub, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mt="auto"
      borderTopWidth={1}
      borderStyle="solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container
        as={Stack}
        maxW="container.xl"
        py={6}
        spacing={4}
      >
        <Text pt={2} fontSize="sm" textAlign="center">
          © {new Date().getFullYear()} Event Manager. Tous droits réservés. 
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
