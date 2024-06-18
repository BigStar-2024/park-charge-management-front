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
      <Option value="AL_81">Alabama</Option>
      <Option value="AK_82">Alaska</Option>
      <Option value="AZ_83">Arizona</Option>
      <Option value="AR_84">Arkansas</Option>
      <Option value="CA_85">California</Option>
      <Option value="CO_86">Colorado</Option>
      <Option value="CT_87">Connecticut</Option>
      <Option value="DC_131">District of Columbia</Option>
      <Option value="DE_88">Delaware</Option>
      <Option value="FL_89">Florida</Option>
      <Option value="GA_90">Georgia</Option>
      <Option value="HI_91">Hawaii</Option>
      <Option value="ID_92">Idaho</Option>
      <Option value="IL_93">Illinois</Option>
      <Option value="IN_94">Indiana</Option>
      <Option value="IA_95">Iowa</Option>
      <Option value="KS_96">Kansas</Option>
      <Option value="KY_97">Kentucky</Option>
      <Option value="LA_98">Louisiana</Option>
      <Option value="ME_99">Maine</Option>
      <Option value="MD_100">Maryland</Option>
      <Option value="MA_101">Massachusetts</Option>
      <Option value="MI_102">Michigan</Option>
      <Option value="MN_103">Minnesota</Option>
      <Option value="MS_104">Mississippi</Option>
      <Option value="MO_105">Missouri</Option>
      <Option value="MT_106">Montana</Option>
      <Option value="NE_107">Nebraska</Option>
      <Option value="NV_108">Nevada</Option>
      <Option value="NH_109">New Hampshire</Option>
      <Option value="NJ_110">New Jersey</Option>
      <Option value="NM_111">New Mexico</Option>
      <Option value="NY_112">New York</Option>
      <Option value="NC_113">North Carolina</Option>
      <Option value="ND_114">North Dakota</Option>
      <Option value="OH_115">Ohio</Option>
      <Option value="OK_116">Oklahoma</Option>
      <Option value="OR_117">Oregon</Option>
      <Option value="PA_118">Pennsylvania</Option>
      <Option value="RI_119">Rhode Island</Option>
      <Option value="SC_120">South Carolina</Option>
      <Option value="SD_121">South Dakota</Option>
      <Option value="TN_122">Tennessee</Option>
      <Option value="TX_123">Texas</Option>
      <Option value="UT_124">Utah</Option>
      <Option value="VT_125">Vermont</Option>
      <Option value="VA_126">Virginia</Option>
      <Option value="WA_127">Washington</Option>
      <Option value="WV_128">West Virginia</Option>
      <Option value="WI_129">Wisconsin</Option>
      <Option value="WY_130">Wyoming</Option>
    </Select>
  );
}
