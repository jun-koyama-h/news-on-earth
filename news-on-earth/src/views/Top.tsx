import { Link } from "react-router-dom";
import Globe from './Globe';
import React from 'react';

const Top: React.FC = () => {
  const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // 中央寄せ
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Globe />
      <Link to="/SearchPage" style={{ textDecoration: 'none' }}>
        <button type="button" style={buttonStyle}>News on earth</button>
      </Link>
    </div>
  );
};

export default Top;
