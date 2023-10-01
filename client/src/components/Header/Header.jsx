import logo from '../../assets/wyd-logos-blue/logo-tab.png';

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white">
      <div className="flex items-center">
        <img
          src={logo}
          alt="wyd-chat logo"
          className="max-w-32 max-h-32"
        />
        <h1 className="text-3xl ml-4">wyd chat</h1>
      </div>
    </header>
  )
}