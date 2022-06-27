import React, { useEffect, useState } from "react";
import DashboardItem from "../shared/DashboardItem/DashboardItem";
import styles from "./Dashboard.module.css";

import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { UserData } from "../shared/DashboardItem/DummyData/dummy";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const dummyUserData = {
  labels: UserData.map((data) => data.year),
  datasets: [
    {
      label: "Users Gained",
      data: UserData.map((user) => user.userGain),
      backgroundColor: ["#2F80ED"],
    },
  ],
};

function Dashboard() {
  const [userData, setUserData] = useState(dummyUserData);

  const dashboardItems = React.useMemo(
    () => [
      {
        id: 1,
        title: "Company Facts",
        slides: [
          { id: 1, name: "Employees", chartType: "doughnut", data: userData },
          { id: 2, name: "Customers", chartType: "bar", data: userData },
          { id: 3, name: "Hello", chartType: "bar", data: userData },
        ],
      },
      // {
      //   id: 2,
      //   title: "Statistics",
      //   slides: [
      //     { id: 1, name: "Employees", chartType: "doughnut", data: userData },
      //     { id: 2, name: "Customers", chartType: "bar", data: userData },
      //     { id: 3, name: "Hello", chartType: "bar", data: userData },
      //   ],
      // },
      // {
      //   id: 3,
      //   title: "Assigned Risks",
      //   slides: [
      //     { id: 1, name: "Employees", chartType: "bar", data: userData },
      //     { id: 2, name: "Customers", chartType: "bar", data: userData },
      //     { id: 3, name: "Hello", chartType: "bar", data: userData },
      //   ],
      // },
      // { id: 4, title: "Assigned Action Items" },
    ],
    [userData]
  );

  return (
    <div className={styles.container}>
      {dashboardItems.map((item) => (
        <>
        <DashboardItem title={item.title} key={item.id}>
          {item.slides && (
            <Swiper pagination={true} navigation={true} modules={[Pagination, Navigation]} className={styles.swiper}>
              {item.slides.map((item) => (
                <>
                  <SwiperSlide className={styles.slide} key={item.id}>
                    <span className={styles.slideName}>{item.name}</span>

                    {item.chartType === "doughnut" && (
                      <div className={styles.doughnut}>
                        <Doughnut data={item.data} />
                      </div>
                    )}

                    {item.chartType === "bar" && (
                      <div className={styles.bar}>
                        <Line data={item.data} height={240} />
                      </div>
                    )}
                  </SwiperSlide>
                </>
              ))}
            </Swiper>
          )}
        </DashboardItem>

        </>
      ))}
    </div>
  );
}

export default Dashboard;
