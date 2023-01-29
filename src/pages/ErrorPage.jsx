import { Link } from 'react-router-dom';
export default function ErrorPage() {
  return (
    <>
      <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ color: '#fff' }}> Page Not Found 404</h1>
        <Link to="/" style={{ color: '#1dca1d' }}>
          Back to home
        </Link>
      </div>
    </>
  );
}
