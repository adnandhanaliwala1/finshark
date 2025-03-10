import React, { useEffect, useState } from "react";
import { getCompanyTenK } from "../../api";
import { CompanyTenK } from "../../company";
import TenKFinderItem from "./TenKFinderItem";
import Spinner from "../Spinner/Spinner";

type Props = {
  ticker: string;
};

const TenKFinder = ({ ticker }: Props) => {
  const [companyData, setCompanyData] = useState<CompanyTenK[]>();
  useEffect(() => {
    const getCompanyData = async () => {
      const value = await getCompanyTenK(ticker);
      setCompanyData(value?.data);
    };
    getCompanyData();
  }, [ticker]);

  return (
    <div className="inline-flex rounded-md shadow-sm m-4">
      {companyData ? (
        companyData?.slice(0, 5).map((tenK) => {
          return <TenKFinderItem tenK={tenK} />;
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default TenKFinder;
