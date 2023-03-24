import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Main Page',
    path: '/',
    icon: <AiIcons.AiOutlineHome/>,
  },
  {
    title: 'Home',
    path: '/admin',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'Products',
    path: '/admin/products',
    icon: <FaIcons.FaCartPlus />,
  },
  {
    title: 'Users',
    path: '/admin/users',
    icon: <IoIcons.IoIosPaper />
  },
  {
    title: 'Reviews',
    path: '/admin/reviews',
    icon: <FaIcons.FaEnvelopeOpenText />,
  },
  {
    title: 'Orders',
    path: '/admin/orders',
    icon: <FaIcons.FaFirstOrder />
  },
  {
    title: 'Sliders',
    path: '/admin/sliders',
    icon: <FaIcons.FaAd />
  },
  {
    title: 'Coupans',
    path: '/admin/coupan',
    icon: <FaIcons.FaDiaspora />
  }
];
