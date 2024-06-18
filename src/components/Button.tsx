import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface BasicButtonsProps {
    text: string;
    width: string;
    paddingX?: string;
    paddingY?: string;
    bgColor?: string;
    hoverColor?: string;
    fontSize?: string;
    active: boolean;
}

export default function BasicButtons({text, width, paddingX, paddingY, bgColor, hoverColor, fontSize, active}: BasicButtonsProps) {
  return (
    <Stack spacing={2} direction="row"> 
      <Button variant="contained" sx={{ width: width, paddingX: paddingX, paddingY: paddingY,backgroundColor: active ? bgColor : "#d2d2e0", '&:hover': {backgroundColor: hoverColor}, fontSize: fontSize}}>{text}</Button> 
    </Stack>
  );
}