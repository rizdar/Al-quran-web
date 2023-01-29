import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useQuery, useQueryClient } from 'react-query';
import { Spinner } from '../components/UI/LoadingSpinner';
import styled from 'styled-components';
import Ayat from '../components/Ayat';
import AudioPlayer from '../components/UI/AudioPlayer';

const fetchSurat = async (suratNum) => {
  const response = await fetch(`https://equran.id/api/surat/${suratNum}`);
  return response.json();
};

export default function SuratPage() {
  const { nomorSurat } = useParams();
  const [currentPage, setCurrentPage] = useState(nomorSurat);
  const [translationOption, setTranslationOption] = useState('all');

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (+currentPage < 114) {
      const page = +currentPage + 1;
      queryClient.prefetchQuery(['next', page], () => fetchSurat(page));
    }
    navigate(`/surat/${currentPage}`);
  }, [currentPage, queryClient]);

  const { data, isLoading, isError, error } = useQuery(['srt', currentPage], () => fetchSurat(currentPage), { staleTime: 2000 });

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div style={{ width: '100%', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Something went wrong...!!!</h3>
        <p>{error.toString()}</p>
      </div>
    );

  return (
    <>
      <SuratInfo>
        <h2>{data.nama_latin}</h2>
        <h3>Surat ke-{data.nomor}</h3>
        <h4>
          {data.jumlah_ayat} Ayat, {data.tempat_turun.replace(data.tempat_turun.charAt(0), data.tempat_turun.charAt(0).toUpperCase())}
        </h4>
      </SuratInfo>

      <AudioPlayer src={data.audio} />

      <SelectContainer>
        <Select value={translationOption} onChange={(event) => setTranslationOption(event.target.value)}>
          <option value="all">Menampilkan Semua</option>
          <option value="ayat">Hanya Ayat</option>
          <option value="latin">Ayat dan Latin</option>
          <option value="terjemah">Ayat dan Terjemahan</option>
        </Select>
      </SelectContainer>

      {+nomorSurat !== 1 && +nomorSurat !== 9 && <Basmallah>بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</Basmallah>}

      <Ayat data={data} translationOption={translationOption} />

      <ButtonWrapper>
        {data.surat_sebelumnya && (
          <button
            onClick={() => {
              setCurrentPage((prevValues) => +prevValues - 1);
            }}
          >
            Sebelumnya surat {data.surat_sebelumnya ? data.surat_sebelumnya.nama_latin : ''}
          </button>
        )}
        {data.surat_selanjutnya && (
          <button
            onClick={() => {
              setCurrentPage((prevValues) => +prevValues + 1);
            }}
          >
            Selanjutnya surat {data.surat_selanjutnya ? data.surat_selanjutnya.nama_latin : ''}
          </button>
        )}
      </ButtonWrapper>
    </>
  );
}

const SuratInfo = styled.div`
  width: 24rem;
  margin: 2rem auto;

  h2 {
    color: #fff;
    font-size: 3rem;

    @media (max-width: 640px) {
      font-size: 2rem;
    }
  }
  h3,
  h4 {
    color: #bdb7b7;
  }
  h4 {
    font-size: 0.8rem;
    font-style: italic;
  }
  @media (max-width: 640px) {
    width: 20rem;
    margin-top: 4rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
  margin-bottom: 4rem;
  button {
    border: none;
    padding: 0.8rem 1.4rem;
    cursor: pointer;
    background-color: #22044d;
    color: #f9f9f9;

    @media (max-width: 640px) {
      padding: 10px 14px;
      font-size: 11px;
    }
  }
`;

const SelectContainer = styled.div`
  position: relative;
  width: 10rem;
  margin-bottom: 4rem;
`;

const Select = styled.select`
  background-color: #22044d;
  color: #f9f9f9;
  min-width: 160px;
  padding: 12px;

  border: none;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;
const Basmallah = styled.div`
  color: #fff;
  font-size: 2rem;
  font-style: normal;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 300;
  margin-bottom: 1rem;
  margin-bottom: 5rem;
`;
