import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const TrialDataContext = createContext({});

export const useTrialDataContext = () => {
  return useContext(TrialDataContext);
};

export const TrialDataProvider = (props) => {
  const location = useLocation();
  const [params] = useSearchParams();

  const [trialData, setTrialData] = useState([]);
  const [material, setMaterial] = useState("");
  const [dataId, setDataId] = useState("");

  useEffect(() => {
    if (location.pathname !== "") {
      setMaterial(location.pathname.replace("/materials/", ""));
      setDataId(params.get("data_id"));
    }
  }, [location.pathname, params]);

  useEffect(() => {
    if (dataId === null) {
      alert("data_idがしていされていません。");
    }

    if (material === "") return;
    if (dataId === "") return;

    (async () => {
      const baseURL = import.meta.env.DEV
        ? "/src/assets/trialData"
        : "/assets/trialData";
      const res = await fetch(`${baseURL}/${material}.csv`);
      const csvResponse = await res.text();
      const csv = csvResponse.split("\n");
      const headers = csv.filter((r, i) => i === 0)[0].split(",");
      const records = csv
        .filter((r, i) => i !== 0)
        .map((r) => r.split(","))
        .filter((r) => !r.every((v) => v === ""));
      const trialDataJson = records
        .map((r) => {
          const values = {};
          r.forEach((v, i) => {
            values[headers[i]] = v;
          });
          return values;
        })
        .filter((r) => r.data_id !== "");
      setTrialData(trialDataJson);
    })();
  }, [material, dataId]);

  const value = {
    material,
    trialData,
    dataId,
  };

  return (
    <TrialDataContext.Provider value={value}>
      {props.children}
    </TrialDataContext.Provider>
  );
};
