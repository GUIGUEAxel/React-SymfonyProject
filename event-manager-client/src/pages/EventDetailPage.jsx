import { useState, useEffect } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { 
  Container, Heading, Text, Box, VStack, Spinner, 
  Center, Button, Divider, HStack, Badge, Link, 
  Table, Thead, Tbody, Tr, Th, Td, useColorModeValue,
  Avatar, AvatarGroup
} from '@chakra-ui/react'
import { ArrowBackIcon, EmailIcon } from '@chakra-ui/icons'
import axios from 'axios'
import React from 'react';

const EventDetailPage = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/events/${id}`)
        setEvent(response.data)
        setLoading(false)
      } catch (err) {
        setError("Erreur lors du chargement des données de l'événement")
        setLoading(false)
        console.error(err)
      }
    }

    fetchEventData()
  }, [id])

  if (loading) {
    return (
      <Center h="200px">
        <Spinner size="xl" />
      </Center>
    )
  }

  if (error || !event) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box textAlign="center">
          <Text color="red.500">{error || "Événement non trouvé"}</Text>
          <Button as={RouterLink} to="/events" mt={4} leftIcon={<ArrowBackIcon />}>
            Retour à la liste des événements
          </Button>
        </Box>
      </Container>
    )
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('fr-FR', options)
  }

  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleTimeString('fr-FR', options)
  }

  const bgColor = useColorModeValue('gray.50', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Container maxW="container.xl" py={8}>
      <Button as={RouterLink} to="/events" mb={4} leftIcon={<ArrowBackIcon />}>
        Retour aux événements
      </Button>
      
      <VStack align="stretch" spacing={6}>
        <Box>
          <Heading size="xl">{event.name}</Heading>
          <HStack mt={2} spacing={2}>
            {event.type && <Badge colorScheme="blue">{event.type}</Badge>}
            <Badge colorScheme="green">{formatDate(event.date)}</Badge> 
          </HStack>
        </Box>
        
        <Box>
          <Text fontSize="lg">
            <strong>Date:</strong> {formatDate(event.date)} à {formatTime(event.date)} 
          </Text>
          {event.location && (
            <Text fontSize="lg">
              <strong>Lieu:</strong> {event.location}
            </Text>
          )}
        </Box>
        
        {event.description && (
          <Box>
            <Heading size="md" mb={2}>Description</Heading>
            <Text>{event.description}</Text>
          </Box>
        )}
        
        <Divider />
        
        <Box>
          <Heading size="md" mb={4}>Artiste</Heading>
          {event.artist ? (
            <HStack>
              {event.artist.imageUrl && (
                <Avatar size="md" name={event.artist.name} src={event.artist.imageUrl} />
              )}
              <Link as={RouterLink} to={`/artists/${event.artist.id}`} color="blue.500">
                {event.artist.name}
              </Link>
            </HStack>
          ) : (
            <Text>Information sur l'artiste non disponible.</Text>
          )}
        </Box>
        
        <Divider />
        
        <Box>
          <Heading size="md" mb={4}>Participants ({event.participants?.length || 0})</Heading>
          
          {event.participants && event.participants.length > 0 ? (
            <>
              <Box overflowX="auto" borderWidth="1px" borderRadius="lg" borderColor={borderColor}>
                <Table variant="simple" size="sm">
                  <Thead bg={bgColor}>
                    <Tr>
                      <Th width="50px">#</Th>
                      <Th>Email</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {event.participants.map((user, index) => (
                      <Tr key={user.id}>
                        <Td>{index + 1}</Td>
                        <Td>
                          <HStack>
                            <EmailIcon color="blue.500" />
                            <Text>{user.email}</Text>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </>
          ) : (
            <Box p={4} bg={bgColor} borderRadius="md">
              <Text>Aucun participant inscrit pour le moment.</Text>
            </Box>
          )}
        </Box>
        
        {event.creator && (
          <Box>
            <Text fontSize="sm" color="gray.500">
              Créé par: {event.creator.email}
            </Text>
          </Box>
        )}
      </VStack>
    </Container>
  )
}

export default EventDetailPage
