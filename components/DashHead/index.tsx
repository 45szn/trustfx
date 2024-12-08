import { Search, Moon, CircleUserRound } from "lucide-react";
import { NotificationsPopover } from "@/components/Notifications";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
}

const DashHead: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="flex justify-between w-full">
      <h1 className="text-xl font-bold">{title}</h1>

      <div className="hidden gap-3 lg:flex">
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="relative">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="relative">
                  <Moon className="h-4 w-4" />
                </Button>
                <NotificationsPopover />
              </div>

              <Button variant="outline" size="icon" className="relative">
                <CircleUserRound className="h-4 w-4" />
              </Button>
            </div>
    </div>
  );
};

export default DashHead;
