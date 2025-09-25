'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Scale,
  Brain,
  FileText,
  FolderOpen,
  User,
  Settings,
  LogOut,
  Menu,
  Bell,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationHeaderProps {
  className?: string;
}

const navigationItems = [
  {
    title: 'Case Assessment',
    href: '/',
    icon: Brain,
    description: 'AI-powered case analysis'
  },
  {
    title: 'Evidence & Cases',
    href: '/evidence',
    icon: FolderOpen,
    description: 'Manage evidence and cases'
  },
  {
    title: 'Document Tools',
    href: '/documents',
    icon: FileText,
    description: 'Generate legal documents'
  }
];

export function NavigationHeader({ className }: NavigationHeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const getCurrentPageTitle = () => {
    const currentItem = navigationItems.find(item => item.href === pathname);
    return currentItem?.title || 'Civil Rights Legal Platform';
  };

  return (
    <header className={cn('sticky top-0 z-50 w-full border-b bg-legal-navy text-white shadow-sm', className)}>
      <div className="container flex h-16 items-center px-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg">
              <Scale className="h-5 w-5 text-legal-navy" />
            </div>
            <div className="hidden md:block">
              <h1 className="font-bold text-lg">JUSTICE HUB</h1>
              <p className="text-xs text-legal-blue/80">Civil Rights Legal Platform</p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex mx-8 flex-1">
          <ul className="flex items-center space-x-6">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right side - Notifications, Help, Profile */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative text-white/80 hover:text-white hover:bg-white/10"
          >
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-legal-warning text-white">
              3
            </Badge>
          </Button>

          {/* Help */}
          <Button
            variant="ghost"
            size="sm"
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 text-white/80 hover:text-white hover:bg-white/10">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-legal-blue text-white text-xs">
                    JD
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline">John Doe</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white/80 hover:text-white hover:bg-white/10"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center justify-center w-8 h-8 bg-legal-navy rounded-lg">
                  <Scale className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">JUSTICE HUB</h2>
                  <p className="text-xs text-muted-foreground">Civil Rights Legal Platform</p>
                </div>
              </div>

              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-3 rounded-lg transition-colors',
                        isActive
                          ? 'bg-legal-navy text-white'
                          : 'text-foreground hover:bg-muted'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-6 pt-6 border-t space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Page Title Bar (Mobile) */}
      <div className="md:hidden border-t border-white/10 px-4 py-2">
        <h2 className="font-medium text-sm text-white/90">
          {getCurrentPageTitle()}
        </h2>
      </div>
    </header>
  );
}