import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const Trends = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Use invoice or report dummy data for now
    fetch("http://localhost:8000/invoice-data")
      .then((res) => res.json())
      .then((json) => {
        const chartData = json.data.map((item, i) => ({
          name: `Row ${i + 1}`,
          value: item.total || item.amount || Math.random() * 100, // change based on actual key
        }));
        setData(chartData);
      });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Trends;
