import React, { createContext, useState } from 'react';

// Create a context
export const ImageContext = createContext();

// Create a context provider component
export const ImageProvider = ({ children }) => {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <ImageContext.Provider value={{ imageUrl, setImageUrl }}>
      {children}
    </ImageContext.Provider>
  );
};
