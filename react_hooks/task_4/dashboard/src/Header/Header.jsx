import { useContext } from 'react';
import logo from '../assets/holberton-logo.jpg';
import AppContext from '../Context/context';

export default function Header() {
  const { user, logOut } = useContext(AppContext);

  return (
    <>
      <div className="
        App-header
        flex
        items-center
        py-2
        max-[520px]:flex-col
        max-[520px]:justify-center
        max-[520px]:text-center
        gap-4
        max-[520px]:gap-2
      ">
        <img
          src={logo}
          className="
            App-logo
            h-60
            pointer-events-none
            max-[520px]:h-60
            max-[435px]:h-48
          "
          alt="holberton logo"
        />

        <h1 className="
          font-bold
          text-[color:var(--main-color)]
          text-5xl
          max-[520px]:text-5xl
          max-[520px]:mt-2
          max-[435px]:text-4xl
          max-[380px]:text-3xl
        ">
          School dashboard
        </h1>
      </div>

      {user.isLoggedIn && (
        <section id="logoutSection">
          Welcome {user.email} (
          <a href="#" onClick={logOut}>logout</a>
          )
        </section>
      )}
    </>
  );
}
