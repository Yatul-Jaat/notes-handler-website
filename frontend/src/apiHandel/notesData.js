import { useEffect, useState } from "react";

const useNotesData = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handelApi = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch("http://localhost:3000/api/send-notes");
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    handelApi();
  }, []);
  return { notes, loading, error };
};

export default useNotesData;