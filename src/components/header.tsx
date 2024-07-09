import { FaBookOpen, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

import { useToken } from '@/utils/contexts/token';

export default function Header() {
  const { token, user, changeToken } = useToken();
  const navigate = useNavigate();

  function handleLogout() {
    changeToken();
    toast('Logout Successfully');
    navigate('/');
  }

  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
      <Link to={'/books'} className="flex items-center gap-2">
        <FaBookOpen width={24} height={24} className="h-6 w-6" />
        <span className="text-xl font-bold">BookQuest</span>
      </Link>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          {token ? (
            <>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.profile_picture} />
                  <AvatarFallback>
                    <FaUser />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-1">
                <DropdownMenuLabel className="font-bold">{user?.full_name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to={'/profile'}>My Profile</Link>
                </DropdownMenuItem>
                {user?.role === 'admin' ? (
                  <DropdownMenuItem asChild>
                    <Link to="/profile/edit">Dashboard</Link>
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleLogout()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </>
          ) : (
            <>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>
                    <FaUser />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-1">
                <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={'/login'}>Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to={'/register'}>Register</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </>
          )}
        </DropdownMenu>
      </div>
    </header>
  );
}
