import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

const CustomerSupp = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      await axios.post('/api/contact', data);
      setSuccess(true);
      event.target.reset();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }

    setSubmitting(false);
  };

  return (
    <Box maxW="xl" mx="auto" py={8}>
      <Box as="h1" fontSize="2xl" fontWeight="bold" mb={4}>
        Contact Customer Support
      </Box>

      {success ? (
        <Alert status="success" mb={4}>
          <AlertIcon />
          Success! Your message has been sent.
        </Alert>
      ) : (
        <form onSubmit={onSubmit}>
          <FormControl mb={4}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input type="text" name="name" id="name" placeholder="Enter your name" isRequired />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input type="email" name="email" id="email" placeholder="Enter your email" isRequired />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel htmlFor="message">Message</FormLabel>
            <Textarea name="message" id="message" placeholder="Enter your message" rows="5" isRequired />
          </FormControl>

          {error && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              Error: {error}
            </Alert>
          )}

          <Button
            type="submit"
            colorScheme="blue"
            isLoading={submitting}
            loadingText="Submitting..."
            mb={4}
          >
            Submit
          </Button>
        </form>
      )}
    </Box>
  );
};

export default CustomerSupp;
