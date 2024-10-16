import React, { useState } from 'react';
import axios from 'axios';
import { ChakraProvider, Box, VStack, Heading, Input, Textarea, Button, Text, useToast } from '@chakra-ui/react';

export default function Component() {
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [brandValues, setBrandValues] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const API_ENDPOINT = 'https://pou4de2og9.execute-api.eu-north-1.amazonaws.com/prod/generate-branding';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(API_ENDPOINT, {
        brandName,
        industry,
        targetAudience,
        brandValues
      });
      setResult(response.data);
      toast({
        title: "Branding generated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = "Unable to generate branding. Please try again.";
      if (error.response) {
        console.error('Error response:', error.response);
        errorMessage = `Error: ${error.response.status} - ${error.response.data.error || error.response.statusText}`;
      } else if (error.request) {
        console.error('Error request:', error.request);
        errorMessage = "Network error. Please check your connection and try again.";
      }
      toast({
        title: "An error occurred",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  // ... rest of the component code ...
}