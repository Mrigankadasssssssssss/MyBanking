/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import HeaderBox from "../../components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";

const Home = () => {
  const loggedIn = {
    firstName: "Mriganka",
    lastName: "Das",
    email: "dasmriganka.2002@gmail.com",
  };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transaction efficiently."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={2000}
          />
        </header>

        {/* Recent Transaction */}
      </div>
      {/* right sidebar */}
      
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 123.5 }, { currentBalance: 600.5 }]}
      />
    </section>
  );
};

export default Home;
