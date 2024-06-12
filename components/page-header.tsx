'use client';

import NextLink from 'next/link';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { UserNav } from './user-nav';
import logoImage from '../src/images/logo.png';

export default function PageHeader() {
  return (
    <header className="w-full border-b border-border/40">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <div className="mr-4 w-10 cursor-pointer">
            <NextLink href="/" legacyBehavior passHref>
              <Image
                src={logoImage}
                style={{ objectFit: 'cover' }}
                alt="Logo"
                className="block dark:hidden"
              />
            </NextLink>
          </div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NextLink href="/tasks" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Tasks
                  </NavigationMenuLink>
                </NextLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NextLink href="/shortify" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Shortify
                  </NavigationMenuLink>
                </NextLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex flex-1 justify-end">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <UserNav />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
