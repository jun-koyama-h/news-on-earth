import logo from '../assets/logo.svg'; // ロゴファイルをインポート

const Logo = () => {
  return (
    <div>
      <img src={logo} alt="Logo" width="500" height="200"/>
    </div>
  );
};

export default Logo;
