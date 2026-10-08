import { 
  FolderCode, 
  GraduationCap, 
  UserRound, 
  MoreVertical, 
  User, 
  LayoutDashboard, 
  LogOut 
} from "lucide-react";
import Elevate from "@/assets/Elevate.png"
import { Button } from "@/ui/button/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import useToken from "@/features/auth/hooks/use-token";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

export default function NavbarSide() {
  const navigate = useNavigate();
  const { removeToken } = useToken();

  function handleLogout() {
    removeToken();
    navigate("/login", { replace: true });
  }

  return (
    <section className="bg-blue-50 px-4 py-6 h-full w-64 flex flex-col justify-between">
      <div className="flex flex-col items-start gap-6">
        <header className="flex flex-col items-start gap-3">
          <img src={Elevate} alt="Elevate" className="w-65" />
          <div className="flex items-center gap-2 text-blue-600">
            <FolderCode className="w-5 h-5" />
            <span className="font-bold text-lg tracking-wide">
              Exam App
            </span>
          </div>
        </header>

        <div className="flex flex-col items-center gap-2 w-full">
          <Button
            className="w-full flex items-center justify-start gap-2 bg-blue-100 text-blue-600 hover:bg-blue-200 shadow-none border border-blue-300"
            onClick={() => navigate("/diploma")}
          >
            <GraduationCap className="w-5 h-5" /> Diplomas
          </Button>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-start gap-2 text-slate-600 hover:bg-blue-100 hover:text-slate-900"
            onClick={() => navigate("/account-settings")}
          >
            <UserRound className="w-5 h-5" /> Account Settings
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-blue-100">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 rounded-lg">
            <AvatarImage src="https://github.com/shadcn.png" className="object-cover" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-blue-600">First name</span>
            <span className="text-xs text-slate-500">user-email@example.com</span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center p-0 text-slate-400 hover:text-slate-600">
            <MoreVertical className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 p-1">
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2 cursor-pointer text-slate-700">
                <User className="w-4 h-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 cursor-pointer text-slate-700">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
}