import styled from 'styled-components';
import Surat from './Surat';

export default function SemuaSurat({ data }) {
  return (
    <Grid dataLength={data.length}>
      {data.map((surat) => (
        <List key={surat.nomor}>
          <Surat nama={surat.nama} namaLatin={surat.nama_latin} arti={surat.arti} nomor={surat.nomor} />
        </List>
      ))}
    </Grid>
  );
}

const List = styled.li`
  list-style: none;
`;
const Grid = styled.ul`
  margin-top: 4rem;
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fit, minmax(20rem, ${(props) => (props.dataLength > 1 ? '1fr' : '25.5rem')}));
  @media (max-width: 640px) {
    margin-top: 0;
  }
`;
