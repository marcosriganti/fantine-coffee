import React, { useEffect, useState } from 'react';

export const useCollection = query => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const queryRef = query();
    if (!queryRef) return;
    const unsubscribe = queryRef.onSnapshot(querySnapshot => {
      const result = querySnapshot.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setData(result);

      if (loading) {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return [data, loading];
};

export const useDocument = query => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const queryRef = query();
    if (!queryRef) return;
    const unsubscribe = queryRef.onSnapshot(querySnapshot => {
      const result = {
        ...querySnapshot.data(),
        id: querySnapshot.id,
      };
      setData(result);

      if (loading) {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return [data, loading];
};
