import { useCallback, useState } from "react";
import { z } from "zod";

// const spelling = z.string().regex(/^[0-9|a-z|A-Z]*$/);
// export const alphabetCheck = (str: string) => {
//   return spelling.safeParse(str);
// };

export const useFilteredNumENg = (defaultStr: string, max?: number) => {
  const [value, setValue] = useState(defaultStr);
  const typeChecker = max
    ? z
        .string()
        .regex(/^[0-9|a-z|A-Z]*$/)
        .max(max)
    : z.string().regex(/^[0-9|a-z|A-Z]*$/);

  const mkAlphabetStr = useCallback((str: string) => {
    if (typeChecker.safeParse(str).success) {
      setValue(str);
    }
  }, []);
  return { mkAlphabetStr, value };
};
