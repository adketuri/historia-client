import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface InitContextProps {
  dismissed: boolean;
  setDismissed: Dispatch<SetStateAction<boolean>>;
}

const VerificationContext = createContext({
  dismissed: false,
} as InitContextProps);
export const useVerification = () => useContext(VerificationContext);

export const VerificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dismissed, setDismissed] = useState(false);
  const value = { dismissed, setDismissed };
  return (
    <VerificationContext.Provider value={value}>
      {children}
    </VerificationContext.Provider>
  );
};
