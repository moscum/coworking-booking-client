import React, { useRef, useState } from 'react';

import { Button } from 'clcm';
import cn from 'clsx';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useDispatch, useSelector } from '@src/hooks';
import useOutsideClick from '@src/utils/useOutsideClick';
import { setSelectedTable } from '@store/table';
import { logout, selectUserState } from '@store/user';

const variants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.15 } },
  visible: { opacity: 1 },
};

const UserMenu: React.VFC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = React.useState(false);

  const buttonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useOutsideClick([menuRef, buttonRef], () => {
    setVisible(false);
  });

  const userState = useSelector(selectUserState);

  return (
    <div className={'relative'}>
      <div ref={buttonRef}>
        <button
          className={'flex items-center mb-auto'}
          onClick={() => {
            setVisible(!visible);
            setDisplay(true);
          }}
        >
          <span
            className={'font-manrope text-lg text-primary font-semibold mr-1'}
          >
            {userState.user?.firstName} {userState.user?.lastName}
          </span>
          <img
            src={'/images/arrow.svg'}
            alt={'arrow'}
            className={visible ? 'transition-all' : '-rotate-90 transition'}
          />
        </button>
      </div>
      <motion.div
        initial="hidden"
        animate={visible ? 'visible' : 'hidden'}
        variants={variants}
        onAnimationComplete={!visible ? () => setDisplay(false) : undefined}
        ref={menuRef}
      >
        <div
          className={cn(
            'absolute right-0 transition-all flex flex-col z-10',
            !display && 'hidden'
          )}
        >
          <Link href={'/'} passHref>
            <Button
              className={cn(
                'border-solid font-manrope rounded px-6 py-0.5 mb-1 transition-all shadow-md',
                router.pathname === '/'
                  ? 'bg-primary text-white cursor-default'
                  : 'bg-white border-2 border-primary text-primary hover:bg-blue-3'
              )}
              disabled={router.pathname === '/'}
              whileTap={router.pathname === '/' ? undefined : { scale: 0.95 }}
            >
              Бронирование
            </Button>
          </Link>
          <Link href={'/history'} passHref>
            <Button
              onClick={() => dispatch(setSelectedTable(null))}
              className={cn(
                'border-solid font-manrope rounded px-6 py-0.5 mb-1 transition-all shadow-md',
                router.pathname === '/history'
                  ? 'bg-primary text-white cursor-default'
                  : 'bg-white border-2 border-primary text-primary hover:bg-blue-3'
              )}
              disabled={router.pathname === '/history'}
              whileTap={
                router.pathname === '/history' ? undefined : { scale: 0.95 }
              }
            >
              История
            </Button>
          </Link>
          <Link href={'/login'} passHref>
            <Button
              className={
                'bg-white border-solid font-manrope border-2 border-primary text-primary rounded px-6 py-0.5 transition-all hover:bg-blue-3 shadow-md'
              }
              onClick={() => dispatch(logout())}
            >
              Выйти
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default UserMenu;
