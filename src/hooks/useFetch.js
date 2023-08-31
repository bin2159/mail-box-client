import React, { useEffect, useState } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const sendRequest = async (reqData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(reqData.url, {
        method: reqData.method ? reqData.method : "GET",
        body: reqData.body ? JSON.stringify(reqData.body) : null,
        headers: reqData.headers ? reqData.headers : {},
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      setIsLoading(false);
      return data;
    } catch (error) {
      setError(error.message || "Something Went Wrong");
      setIsLoading(false);
    }
  };
  return { isLoading, error, sendRequest };
};

export default useFetch;
