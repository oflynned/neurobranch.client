import { useState, useContext, createContext, useEffect } from 'react';
import { ConfigService } from '../../config/config.service';

const ConfigContext = createContext<{
  config: ConfigService | null;
}>({
  config: null,
});

export const ConfigProvider = ({ children }) => {
  const [config] = useState(new ConfigService());

  return (
    <ConfigContext.Provider value={{ config }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  return useContext(ConfigContext);
};
