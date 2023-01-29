import styled from 'styled-components';

export default function Ayat({ data, translationOption }) {
  return (
    <>
      <ul>
        {data.ayat.map((ayt) => (
          <ListAyatWrapper key={ayt.nomor}>
            <div style={{ color: '#BDB7B7' }}>
              <Nomor>{ayt.nomor}</Nomor>
            </div>
            <AyatWrapper>
              <h3>{ayt.ar}</h3>
              {(translationOption === 'all' || translationOption === 'latin') && <h6>{ayt.tr}</h6>}
              {(translationOption === 'all' || translationOption === 'terjemah') && <h5>{ayt.idn}</h5>}
            </AyatWrapper>
          </ListAyatWrapper>
        ))}
      </ul>
    </>
  );
}

const Nomor = styled.div`
  width: 40px;
  height: 40px;
  background-color: #22044d;
  padding: 0.8rem;
  border-radius: 50%;
  color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ListAyatWrapper = styled.li`
  list-style: none;
  display: flex;
  gap: 3rem;
  margin-bottom: 2rem;
  @media (max-width: 640px) {
    gap: 1rem;
  }
`;

const AyatWrapper = styled.div`
  text-align: right;
  width: 100%;
  h3 {
    color: #fff;
    font-size: 2rem;
    font-style: normal;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 300;
    margin-bottom: 1rem;
  }
  h5 {
    color: #f7f7f7;
  }
  h6 {
    font-style: italic;
    font-size: 0.8rem;
    color: #bdb7b7;
    margin-bottom: 0.5rem;
  }
`;
