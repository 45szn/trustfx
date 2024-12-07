import { Search, Moon, Bell, CircleUserRound } from "lucide-react";

interface HeaderProps {
  title: string;
}

const DashHead: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="flex justify-between w-full">
      <h1 className="text-xl font-bold">{title}</h1>

      <div className="hidden gap-3 lg:flex">
        <div className="flex gap-3">
          <Search />
          <Moon />
          <Bell />
        </div>

        <div>
          <CircleUserRound />
        </div>
      </div>
    </div>
  );
};

export default DashHead;
