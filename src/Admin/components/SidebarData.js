import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
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
    path: '/overview/users',
    icon: <IoIcons.IoIosPaper />
  },
  {
    title: 'Reviews',
    path: '/admin/reviews',
    icon: <FaIcons.FaEnvelopeOpenText />,
  },
  {
    title: 'Orders',
    path: '/orders',
    icon: <FaIcons.FaFirstOrder />
  }
];
