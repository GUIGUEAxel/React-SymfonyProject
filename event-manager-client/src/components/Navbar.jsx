import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Link,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Container,
  Icon,
  HStack
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon} from '@chakra-ui/icons';
import { FaMusic, FaCalendarAlt, FaHome } from 'react-icons/fa';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const location = useLocation();

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="sticky"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottom={1}
      borderStyle="solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      shadow="sm"
    >
      <Container maxW="container.xl">
        <Flex minH="60px" py={{ base: 2 }} px={{ base: 4 }} align="center">
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant="ghost"
              aria-label="Toggle Navigation"
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Link
              as={RouterLink}
              to="/"
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily="heading"
              fontWeight="bold"
              color={useColorModeValue('gray.800', 'white')}
              display="flex"
              alignItems="center"
              _hover={{ textDecoration: 'none' }}
            >
              <Icon as={FaMusic} w={6} h={6} color="blue.500" mr={2} />
              <Text fontSize="xl" bgGradient="linear(to-r, blue.400, teal.400)" bgClip="text">
                Event Manager
              </Text>
            </Link>

            <HStack
              as="nav"
              spacing={6}
              display={{ base: 'none', md: 'flex' }}
              ml={10}
            >
              <NavLink to="/" icon={FaHome} isActive={location.pathname === '/'}>
                Accueil
              </NavLink>
              <NavLink to="/events" icon={FaCalendarAlt} isActive={location.pathname.startsWith('/events')}>
                Événements
              </NavLink>
              <NavLink to="/artists" icon={FaMusic} isActive={location.pathname.startsWith('/artists')}>
                Artistes
              </NavLink>
            </HStack>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify="flex-end"
            direction="row"
            spacing={6}
          >
            
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <Stack
            p={4}
            display={{ md: 'none' }}
            borderRadius="md"
            bg={useColorModeValue('white', 'gray.900')}
            shadow="md"
            spacing={4}
          >
            <MobileNavLink to="/" icon={FaHome}>Accueil</MobileNavLink>
            <MobileNavLink to="/events" icon={FaCalendarAlt}>Événements</MobileNavLink>
            <MobileNavLink to="/artists" icon={FaMusic}>Artistes</MobileNavLink>
          </Stack>
        </Collapse>
      </Container>
    </Box>
  );
};

const NavLink = ({ children, to, icon, isActive }) => {
  const color = isActive ? "blue.500" : "gray.600";
  const hoverColor = "blue.500";

  return (
    <Link
      as={RouterLink}
      to={to}
      px={2}
      py={1}
      rounded="md"
      fontWeight={isActive ? "bold" : "medium"}
      color={color}
      display="flex"
      alignItems="center"
      _hover={{
        textDecoration: 'none',
        color: hoverColor,
      }}
    >
      <Icon as={icon} mr={2} />
      {children}
    </Link>
  );
};

const MobileNavLink = ({ children, to, icon }) => {
  return (
    <Link
      as={RouterLink}
      to={to}
      p={2}
      display="flex"
      alignItems="center"
      rounded="md"
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.50', 'gray.700'),
      }}
    >
      <Icon as={icon} mr={3} />
      <Text fontWeight="medium">{children}</Text>
    </Link>
  );
};

export default Navbar;
