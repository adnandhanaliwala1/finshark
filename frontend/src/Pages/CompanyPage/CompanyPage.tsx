import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { C } from "react-router/dist/development/route-data-BmvbmBej";
import { CompanyProfile } from "../../company";
import { getCompanyProfile } from "../../api";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Dashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tile from "../../Tile/Tile";

interface Props {}

const CompanyPage = (props: Props) => {
  let { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyProfile(ticker!);
      setCompany(result?.data[0]);
    };
    getProfileInit();
  }, []);
  return (
    <>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />
          <CompanyDashboard ticker={ticker}>
            <Tile title="Company Name" subtitle={company.companyName} />
          </CompanyDashboard>
        </div>
      ) : (
        <div>Company Not Found</div>
      )}
    </>
  );
};

export default CompanyPage;
