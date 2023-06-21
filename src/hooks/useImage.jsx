import { useState, useEffect } from 'react';

export const useImage = () => {
  const [image, setImage] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((json) => setImage(json));


    console.log('useImage');
  }, []);

  return {
    image,
  }
}