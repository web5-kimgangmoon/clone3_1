import { useCallback, useState } from "react";
import { z } from "zod";

const spelling = z.string().regex(/^[0-9|a-z|A-Z]*$/);

export const alphabetCheck = (str: string) => {
  return spelling.safeParse(str);
};

export const useFilteredNumENg = (defaultStr: string) => {
  const [preStr, setPreStr] = useState(defaultStr);

  const mkAlphabetStr = useCallback(
    (str: string) => {
      if (alphabetCheck(str).success) {
        setPreStr(() => str);
        return str;
      }
      return preStr;
    },
    [preStr]
  );
  return mkAlphabetStr;
};
