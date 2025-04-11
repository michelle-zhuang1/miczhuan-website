import React, { useEffect, useState } from 'react';

function Fetch() {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetch('/get-image-url/image1.jpg')
      .then(response => response.json())
      .then(data => setImageUrl(data.url));
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      {imageUrl ? <img src={imageUrl} alt="S3 Image" width="300" /> : <p>Loading...</p>}
    </div>
  );
}

export default Fetch;
