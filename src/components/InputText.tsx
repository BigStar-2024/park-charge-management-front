import { useAppSelector } from "../redux/hooks";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Violation from "../utility/type";

interface OptionType {
  key: string;
  label: string;
}

interface StateTextFieldsProps {
  width: string;
  label: string;
  value: string; // Add value prop
  valueType: string;
  onChange: (value: string) => void; // Add onChange prop
}

export default function StateTextFields({
  width,
  label,
  value,
  valueType,
  onChange,
}: StateTextFieldsProps) {

  // Dummy data. Uncomment the following when using redux selector.
  const violationList = useAppSelector(
    (state) => state.pay.violationList_redux
  );
  
  const handleInputChange = (_event: React.ChangeEvent<{}>, newInputValue: string) => {
    onChange(newInputValue);
  };

  const handleSelectionChange = (_event: React.ChangeEvent<{}>, newValue: OptionType | null) => {
    if (newValue !== null) {
      onChange(newValue.label);
    }
  };

  const options: OptionType[] =
    valueType === "plateNumber"
      ? violationList.map((item: Violation) => ({
          key: item.parkingChargeNumber,
          label: item.plateNumber,
        }))
      : violationList.map((item: Violation) => ({
          key: item.parkingChargeNumber,
          label: item.parkingChargeNumber,
        }));

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 0, width: width },
        "& input": { borderColor: "#ff551d" }, // Set initial border color
      }}
      style={{
        borderColor: "#FA551D",
        color: "#091C62",
        backgroundColor: "#FFF5F3",
      }}
      noValidate
      autoComplete="on"
    >
      <TextField
            id="outlined-controlled"
            label={label}
            value={value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onChange(event.target.value);
            }}
      />
    </Box>
  );
}
