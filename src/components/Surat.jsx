import { Link } from 'react-router-dom';

import styled from 'styled-components';

export default function Surat({ nama, namaLatin, arti, nomor }) {
  return (
    <div>
      <Link to={`${nomor}`}>
        <WrapperList>
          <Left>
            <h3>{nomor}</h3>
          </Left>
          <Right>
            <h3>{nama}</h3>
            <h4>{namaLatin}</h4>
            <h6>{arti}</h6>
          </Right>
        </WrapperList>
      </Link>
    </div>
  );
}

const WrapperList = styled.div`
  background-color: #22044d;
  display: flex;
  align-items: center;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  cursor: pointer;
  transition: all 0.1s;

  :hover {
    transform: scale(1.1);
  }

  h3 {
    color: #e9e9e9;
    font-size: 1rem;
  }
  h4 {
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
  }
  h6 {
    color: #c5c2c2;
    font-size: 0.8rem;
    font-family: sans-serif;
    font-style: italic;
  }
`;

const Left = styled.div`
  margin: 0 auto;
  width: 20%;
  padding: 0.5rem 1.5rem;
`;
const Right = styled.div`
  width: 80%;
  border-left: 2px solid #fff;
  padding: 0.5rem 1.5rem;
  h3 {
    margin-bottom: 0.3rem;
  }
`;
