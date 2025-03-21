import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

export const getArtists = async () => {
  try {
    const response = await axios.get(`${API_URL}/artists`)
    return response.data['hydra:member']
  } catch (error) {
    console.error('Error fetching artists', error)
    throw error
  }
}

export const getArtist = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/artists/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching artist with id ${id}`, error)
    throw error
  }
}

export const getEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`)
    return response.data['hydra:member']
  } catch (error) {
    console.error('Error fetching events', error)
    throw error
  }
}

export const getEvent = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/events/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching event with id ${id}`, error)
    throw error
  }
}

export const getArtistEvents = async (artistId) => {
  try {
    const response = await axios.get(`${API_URL}/events?artist=${artistId}`)
    return response.data['hydra:member']
  } catch (error) {
    console.error(`Error fetching events for artist with id ${artistId}`, error)
    throw error
  }
}
