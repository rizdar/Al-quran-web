import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import SemuaSurat from '../components/SemuaSurat';
import { FaSearch } from 'react-icons/fa';
import { Spinner } from '../components/UI/LoadingSpinner';

export default function HomePage() {
  const [filterValue, setFilterValue] = useState('');
  const { data, isLoading, isError, error } = useQuery('surat', async () => {
    const response = await fetch('https://equran.id/api/surat');
    return response.json();
  });

  // Function to update filterValue state when input value changes
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  // Filter data based on filterValue
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) setFilteredData(data.filter((surat) => surat.nama_latin.toLowerCase().includes(filterValue.toLowerCase())));
  }, [data, filterValue]);

  if (isLoading) return <Spinner />;

  if (isError)
    return (
      <div style={{ width: '100%', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Something went wrong...!!!</h3>
        <p>{error.toString()}</p>
      </div>
    );

  return (
    <Container>
      <SearchContainer>
        <Input type="text" onChange={handleFilterChange} value={filterValue} placeholder="Cari surat berdasarkan nama" />
        <SearchIcon />
      </SearchContainer>

      <SemuaSurat data={filteredData} />
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 4rem;
`;

const Input = styled.input`
  position: relative;
  width: 100%;
  padding: 0.5rem 2rem;
  outline-style: none;
  border-radius: 1rem;
  border: none;
`;

const SearchIcon = styled(FaSearch)`
  color: gray;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
`;
const SearchContainer = styled.div`
  position: relative;
  width: 20rem;
  margin: 4rem auto;

  @media (max-width: 640px) {
    margin: 4rem auto 2rem auto;
  }
`;
