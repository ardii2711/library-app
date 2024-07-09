import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaBookOpen, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { ProfileType } from "@/utils/types/users";
import { getProfile } from "@/utils/apis/users";

export default function Header() {
  const [user, setUser] = useState<ProfileType>();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  function handleLogout() {
    Cookies.remove("token");
    window.location.reload();
  }

  async function fetchData() {
    try {
      const response = await getProfile();
      setUser(response.payload);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
      <Link to={"/books"} className="flex items-center gap-2">
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
                <DropdownMenuItem className="font-bold">
                  <Link to={"/profile"}>{user?.full_name}</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} asChild>
                  <Link to={"/"}>Logout</Link>
                </DropdownMenuItem>
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
                <DropdownMenuItem className="font-bold">My Account</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={"/login"}>Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to={"/register"}>Register</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </>
          )}
        </DropdownMenu>
      </div>
    </header>
  );
}
