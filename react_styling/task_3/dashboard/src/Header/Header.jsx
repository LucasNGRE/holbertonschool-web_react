import logo from '../assets/holberton-logo.jpg'

export default function Header() {
  return (
    <header className="flex items-center gap-6 py-4 px-6">
      <img
        src={logo}
        alt="holberton logo"
        className="h-24 w-auto pointer-events-none"
      />

      <h1 className="text-5xl font-bold text-[color:var(--main-color)]">
        School Dashboard
      </h1>
    </header>
  )
}
