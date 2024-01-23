import logo from '../assets/logo.svg'; // ロゴファイルをインポート
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  width: number;
  height: number;
}
const Logo: React.FC<LogoProps> = ({ width, height }) => {
  const navigate = useNavigate();
  const navigateToSearch = () => {
    navigate('/SearchPage'); // '/search'はSearchPage.tsxに対応するパス
  };
  return (
    <div onClick={navigateToSearch} style={{ cursor: 'pointer' }}>
      <img src={logo} alt="Logo" width={width} height={height}/>
    </div>
  );
};
export default Logo;