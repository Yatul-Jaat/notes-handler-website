import { useEffect, useState } from "react";

const usePapersData = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handelApi = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch("http://localhost:3000/api/send-papers");
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setPapers(data);
      } catch (error) {
        console.error("Error fetching papers:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    handelApi();
  }, []);

  return { papers, loading, error };
};

export default usePapersData;