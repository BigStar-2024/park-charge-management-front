import * as React from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

interface SelectIndicatorProps {
  width?: string;
  placeholder?: string;
  height?: string;
  fontSize?: string;
  value?: string;
  onChange: (e: any, value: string) => void;
}

export default function SelectIndicator({
  width,
  placeholder,
  height,
  fontSize,
  value,
  onChange,
}: SelectIndicatorProps) {
  return (
    <Select
      placeholder={placeholder}
      indicator={<KeyboardArrowDown />}
      style={{
        width: width,
        height: height,
        fontSize: fontSize,
        borderColor: "#FA551D",
        color: "black",
        backgroundColor: "#FFF5F3",
      }}
      sx={{
        [`& .${selectClasses.indicator}`]: {
          transition: "0.2s",
          [`&.${selectClasses.expanded}`]: {
            transform: "rotate(-180deg)",
          },
        },
        "& .MuiInput-startDecorator": {
          color: "#FFC0CB",
        },
      }}
      value={value}
      onChange={onChange}
    >
      <Option value="Alabama">Alabama</Option>
      <Option value="Alaska">Alaska</Option>
      <Option value="Arizona">Arizona</Option>
      <Option value="Arkansas">Arkansas</Option>
      <Option value="California">California</Option>
      <Option value="Colorado">Colorado</Option>
      <Option value="Connecticut">Connecticut</Option>
      <Option value="District of Columbia">District of Columbia</Option>
      <Option value="Delaware">Delaware</Option>
      <Option value="Florida">Florida</Option>
      <Option value="Georgia">Georgia</Option>
      <Option value="Hawaii">Hawaii</Option>
      <Option value="Idaho">Idaho</Option>
      <Option value="Illinois">Illinois</Option>
      <Option value="Indiana">Indiana</Option>
      <Option value="Iowa">Iowa</Option>
      <Option value="Kansas">Kansas</Option>
      <Option value="Kentucky">Kentucky</Option>
      <Option value="Louisiana">Louisiana</Option>
      <Option value="Maine">Maine</Option>
      <Option value="Maryland">Maryland</Option>
      <Option value="Massachusetts">Massachusetts</Option>
      <Option value="Michigan">Michigan</Option>
      <Option value="Minnesota">Minnesota</Option>
      <Option value="Mississippi">Mississippi</Option>
      <Option value="Missouri">Missouri</Option>
      <Option value="Montana">Montana</Option>
      <Option value="Nebraska">Nebraska</Option>
      <Option value="Nevada">Nevada</Option>
      <Option value="New Hampshire">New Hampshire</Option>
      <Option value="New Jersey">New Jersey</Option>
      <Option value="New Mexico">New Mexico</Option>
      <Option value="New York">New York</Option>
      <Option value="North Carolina">North Carolina</Option>
      <Option value="North Dakota">North Dakota</Option>
      <Option value="Ohio">Ohio</Option>
      <Option value="Oklahoma">Oklahoma</Option>
      <Option value="Oregon">Oregon</Option>
      <Option value="Pennsylvania">Pennsylvania</Option>
      <Option value="Rhode Island">Rhode Island</Option>
      <Option value="South Carolina">South Carolina</Option>
      <Option value="South Dakota">South Dakota</Option>
      <Option value="Tennessee">Tennessee</Option>
      <Option value="Texas">Texas</Option>
      <Option value="Utah">Utah</Option>
      <Option value="Vermont">Vermont</Option>
      <Option value="Virginia">Virginia</Option>
      <Option value="Washington">Washington</Option>
      <Option value="West Virginia">West Virginia</Option>
      <Option value="Wisconsin">Wisconsin</Option>
      <Option value="Wyoming">Wyoming</Option>
    </Select>
  );
}
