import { useState, useEffect } from "react";
import { useWallet } from "use-wallet";

// ----------------------------------------------------------------------

export default function useConnect(connect) {
  const wallet = useWallet();
  const [isConnect, setConnect] = useState(false);

  useEffect(() => {
    setConnect(connect);
  }, [connect]);

  return isConnect;
}
