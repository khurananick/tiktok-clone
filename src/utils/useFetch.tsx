import { useState, useEffect } from 'react';

const userFetch: object = (url: string) => {
  const [data: object, setData] = useState({});

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, [url]);

  return data;
}

export default userFetch;
