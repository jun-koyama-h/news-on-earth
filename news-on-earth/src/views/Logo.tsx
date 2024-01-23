import logo from '../assets/logo.svg'; // ロゴファイルをインポート
interface LogoProps {
  width: number;
  height: number;
}
const Logo: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <div>
      <img src={logo} alt="Logo" width={width} height={height}/>
    </div>
  );
};
export default Logo;