import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: string;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://64aaeb3e0c6d844abedefbc9.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Error");
        navigate("/");
      }
    }
    fetchPizza();
  }, [id, navigate]);
  if (!pizza) {
    return <>Downloading...</>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="Pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}$</h4>
    </div>
  );
};

export default FullPizza;
