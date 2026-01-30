import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const rep = await axios.get(`${API_BASE}/api/${API_PATH}/products`);
        setProducts(rep.data.products);
      } catch (error) {
        console.error(error.response);
      }
    };
    getProducts();
  }, []);
  const openSingleProduct = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className="container">
      <div className="row row-cols-3">
        {products.map((product) => {
          const { category, content, id, price, imageUrl, title } = product;
          return (
            <>
              <div className=" col g-3" key={id}>
                <div className="card h-100">
                  <img src={imageUrl} className="card-img-top" alt="" />
                  <div className="card-body ">
                    <h5 className="card-title">
                      {title}
                      <small className="badge text-bg-primary ms-2">
                        {category}
                      </small>
                    </h5>
                    <p className="card-text">{content}</p>
                    <p>價格：{price}</p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => openSingleProduct(id)}
                    >
                      察看更多
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
