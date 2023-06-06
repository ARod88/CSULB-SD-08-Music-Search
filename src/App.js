import React, { useEffect, useState, Suspense } from 'react';
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';
import { DataContext } from './context/DataContext';
import { createResource } from './helper';
import Spinner from './components/Spinner';

function App() {
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('Search for Music!');
  const [data, setData] = useState(null);

  const API_URL = 'https://itunes.apple.com/search?term=';

  useEffect(() => {
    if (search) {
      fetchData(search);
    }
  }, [search]);

  const fetchData = async (searchTerm) => {
    try {
      const response = await fetch(API_URL + searchTerm);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleSearch = (e, term) => {
    e.preventDefault();
    setSearch(term);
  };

  const renderGallery = () => {
    if (data) {
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery data={data} />
        </Suspense>
      );
    }
  };

  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch} />
      {message}
      {renderGallery()}
    </div>
  );
}

export default App;
