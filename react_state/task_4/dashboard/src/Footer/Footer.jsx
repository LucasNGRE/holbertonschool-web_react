import { useContext } from 'react';
import { getCurrentYear, getFooterCopy } from '../utils/utils';
import AppContext from '../Context/context';

export default function Footer() {
  const { user } = useContext(AppContext);

  return (
    <div className="
      App-footer
      flex
      flex-col
      justify-center
      items-center
      border-t-4
      border-[color:var(--main-color)]
      w-full
      mt-auto
      py-2
      max-[520px]:py-3
      px-2
    ">
      <p className="
        italic
        text-xl
        p-1
        text-center
        max-[520px]:text-lg
        max-[520px]:p-0
        max-[450px]:text-[16px]
        max-[375px]:text-[15px]
        leading-tight
      ">
        Copyright {getCurrentYear()} - {getFooterCopy(false)}
      </p>

      {user && user.isLoggedIn && (
        <p className="mt-1">
          <a href="#" className="underline">
            Contact us
          </a>
        </p>
      )}
    </div>
  );
}
