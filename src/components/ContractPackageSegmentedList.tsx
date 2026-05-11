import { useState, use } from "react";
import "../index.css";
import "@esri/calcite-components/dist/components/calcite-segmented-control";
import "@esri/calcite-components/dist/components/calcite-segmented-control-item";
import { contractPackage } from "../Query";
import { MyContext } from "../contexts/MyContext";

export default function ContractPackageSegmentedList() {
  const { updateContractPackage } = use(MyContext);
  const [contractPackageSelected, setContractPackageSelected] =
    useState<string>(contractPackage[0]);

  return (
    <>
      <calcite-segmented-control
        oncalciteSegmentedControlChange={(event: any) => {
          setContractPackageSelected(event.target.selectedItem.id);
          updateContractPackage(event.target.selectedItem.id);
        }}
        scale="m"
        width="full"
        style={{
          width: "580px",
          marginRight: "80px",
        }}
      >
        {contractPackageSelected &&
          contractPackage.map((contractp: any, index: any) => {
            return (
              <calcite-segmented-control-item
                {...(contractPackageSelected === contractp
                  ? { checked: true }
                  : {})}
                key={index}
                value={contractp}
                id={contractp}
              >
                {contractp}
              </calcite-segmented-control-item>
            );
          })}
      </calcite-segmented-control>
    </>
  );
}
