import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { SvgIcon } from "@mui/material";
import ProductIcon from "@heroicons/react/24/solid/ShoppingBagIcon";

import {
  ArrowDownOnSquareStackIcon,
  ShoppingCartIcon,
  WalletIcon,
  CreditCardIcon,
  GiftIcon,
} from "@heroicons/react/24/solid";

export const items = [
  {
    title: "Overview",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Suppliers",
    path: "/supply/suppliers",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },

  {
    title: "Purchase Orders",
    path: "/purchaseOrders/purchaseOrders",
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingCartIcon class="h-6 w-6 text-gray-500" />
      </SvgIcon>
    ),
  },
  {
    title: "Payments",
    path: "/Payments/payments",
    icon: (
      <SvgIcon fontSize="small">
        <WalletIcon class="h-6 w-6 text-gray-500" />
      </SvgIcon>
    ),
  },
  {
    title: "Products",
    path: "/Products/products",
    icon: (
      <SvgIcon fontSize="small">
        <ProductIcon />
      </SvgIcon>
    ),
  },
  // {
  //   title: "Companies",
  //   path: "/companies",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ShoppingBagIcon />
  //     </SvgIcon>
  //   ),
  // },
  // {
  //   title: "Account",
  //   path: "/account",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserIcon />
  //     </SvgIcon>
  //   ),
  // },
  // {
  //   title: "Settings",
  //   path: "/settings",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CogIcon />
  //     </SvgIcon>
  //   ),
  // },
  {
    title: "Expenses",
    path: "/expenses/expenses",
    icon: (
      <SvgIcon fontSize="small">
        <CreditCardIcon className="h-6 w-6 text-gray-500" />
      </SvgIcon>
    ),
  },
  {
    title: "Allocations",
    path: "/allocations/allocations",
    icon: (
      <SvgIcon fontSize="small">
        <GiftIcon />
      </SvgIcon>
    ),
  },
  // {
  //   title: "Settings",
  //   path: "/settings",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CogIcon />
  //     </SvgIcon>
  //   ),
  // },
  // {
  //   title: "Logout",
  //   path: "/auth/logout",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <LockClosedIcon />
  //     </SvgIcon>
  //   ),
  // },
  // {
  //   title: "Login",
  //   path: "/auth/login",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <LockClosedIcon />
  //     </SvgIcon>
  //   ),
  // },
  // {
  //   title: "Register",
  //   path: "/auth/register",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserPlusIcon />
  //     </SvgIcon>
  //   ),
  // },
  // {
  //   title: "Error",
  //   path: "/404",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <XCircleIcon />
  //     </SvgIcon>
  //   ),
  // },
];
