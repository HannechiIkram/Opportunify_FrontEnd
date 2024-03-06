import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import  { useState, useEffect } from "react";
import  axios  from "axios";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";

import { StatisticsCard } from "@/widgets/cards/index.js";
import { StatisticsChart } from "@/widgets/charts/index.js";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data/index.js";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

export function HomeDashboard() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  return (

 <>

    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
  
    </div>




    <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
  <Card className="overflow-hidden xl:col-span-3 border border-blue-gray-100 shadow-sm">
    <CardHeader
      floated={false}
      shadow={false}
      color="transparent"
      className="m-0 flex items-center justify-between p-6"
    >
      <Typography variant="h6" color="blue-gray" className="mb-1 w-10">
        Users
      </Typography>
    </CardHeader>
    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
      <table className="w-full min-w-[640px] table-auto">
        <thead>
          <tr>
            {["_id", "name", "role", "email"].map((col) => (
              <th key={col} className="border-b border-blue-gray-50 py-3 px-6 text-left">
                <Typography variant="small" className="text-[11px] font-medium uppercase text-blue-gray-400">
                  {col}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border-b border-gray-50 py-3 px-6 text-left">{user._id}</td>
              <td className="border-b border-gray-50 py-3 px-6 text-left">{user.name}</td>
              <td className="border-b border-gray-50 py-3 px-6 text-left">{user.role}</td>
              <td className="border-b border-gray-50 py-3 px-6 text-left">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </CardBody>
  </Card>
</div>



 
    </>
  );
}

export default HomeDashboard;
