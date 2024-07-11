import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
import { toast } from 'sonner';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

import { useTheme } from '@/utils/contexts/theme-provider';
import { useToken } from '@/utils/contexts/token';
import { ModeToggle } from './mode-toggle';

export default function Header() {
  const { token, user, changeToken } = useToken();
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();

  setTheme(theme);

  function handleLogout() {
    changeToken();
    toast('Logout Successfully');
    navigate('/');
  }

  return (
    <header className="top-0 left-0 right-0 z-50 transition-all duration-300 bg-muted  py-4 px-6">
      <div className="flex items-center justify-between">
        <Link to={'/books'} className="flex items-center gap-2">
          <img src="/icons-book.png" width={24} height={24} className="h-6 w-6" />
          <span className="text-xl font-bold">BookQuest</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          {user?.role === 'user' ? (
            <Button variant="ghost" asChild>
              <Link to="/cart">
                <FaShoppingCart size={25} />
              </Link>
            </Button>
          ) : null}
          <DropdownMenu>
            {token ? (
              <>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 cursor-pointer outline outline-1 outline-secondary-foreground">
                    <AvatarImage src={user?.profile_picture} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <div className="flex items-center gap-2 p-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.profile_picture} />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-0.5 leading-none">
                        <div className="font-semibold">{user?.full_name}</div>
                        <div className="text-sm text-muted-foreground">{user?.email}</div>
                      </div>
                      <div className="h-9 w-[1.5px] bg-primary/20"></div>
                      <ModeToggle />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to={'/profile'} className="flex items-center gap-2">
                      <div className="h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === 'admin' ? (
                    <>
                      <DropdownMenuItem>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4" />
                              <span>Dashboard</span>
                            </div>
                            <ChevronRightIcon className="h-4 w-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Link to={'/dashboard/books'} className="flex items-center gap-2">
                                <span>Edit Books</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link to={'/dashboard/borrows'} className="flex items-center gap-2">
                                <span>Edit Borrows</span>
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </DropdownMenuItem>
                    </>
                  ) : null}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => handleLogout()}>
                    <div className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </>
            ) : (
              <>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 cursor-pointer outline outline-1 outline-secondary-foreground">
                    <AvatarImage src={user?.profile_picture} />
                    <AvatarFallback>
                      <FaUser className="text-primary" />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <div className="flex items-center gap-2 p-2">
                      <Avatar className="h-8 w-8 bg-mute">
                        <AvatarImage src={user?.profile_picture} />
                        <AvatarFallback>
                          <FaUser className="text-primary" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-0.5 leading-none">
                        <div className="font-semibold">{user ? user?.full_name : 'My Profile'}</div>
                        <div className="text-sm text-muted-foreground">{user?.email}</div>
                      </div>
                      <div className="h-9 w-[1.5px] bg-primary/20"></div>
                      <ModeToggle />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to={'/login'} className="flex items-center gap-2">
                      <div className="h-4 w-4" />
                      <span>Login</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={'/register'} className="flex items-center gap-2">
                      <div className="h-4 w-4" />
                      <span>Register</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </>
            )}
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
