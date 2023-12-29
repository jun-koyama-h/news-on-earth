import logo from '../assets/logo.svg'; // ロゴファイルをインポート

const Logo = () => {
  return (
    <div style={{
      backgroundImage: `url(${logo})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: '100vh', // ビューポートの高さに合わせる
      minWidth: '100vw', // ビューポートの幅に合わせる
      position: 'fixed', // 固定位置
      top: 0,
      left: 0,
      zIndex: -1, // 他の要素の背景に表示
      opacity: 0.1 // 透明度を設定
    }} />
  );
};

export default Logo;
