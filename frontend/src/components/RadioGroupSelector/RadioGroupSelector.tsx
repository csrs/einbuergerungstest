import { useState } from "react";
import {
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export const RadioGroupSelector = ({ options }: { options: string[] }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  return (
    <FormControl>
      <FormLabel>Select option</FormLabel>

      <RadioGroup
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>

      <Typography sx={{ mt: 2 }}>
        Selected: {selectedOption || "None"}
      </Typography>
    </FormControl>
  );
};
