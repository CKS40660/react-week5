import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
// import * as bootstrap from "bootstrap";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!id) return;

    const fetchSingleProduct = async () => {
      try {
        const rep = await axios.get(
          `${API_BASE}/api/${API_PATH}/product/${id}`,
        );
        setProduct(rep.data.product);
      } catch (error) {
        console.error(error.response);
      }
    };

    fetchSingleProduct();
  }, [id]);
  if (!product) {
    return <p>載入中...</p>;
  }
  const {
    category,
    content,
    price,
    imageUrl,
    title,
    description,
    origin_price,
  } = product;
  const addCart = async (id, qty = 1) => {
    try {
      const data = {
        product_id: id,
        qty,
      };
      const response = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
        data,
      });
      console.log(response.data);
      // modalRef.current.show();
      // 過1秒再hide
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <>
      <div className="card" key={id}>
        <img src={imageUrl} className="card-img" alt={title} />
        <div className="card-body">
          <h5 className="card-title">
            {title} <small>{category}</small>
          </h5>
          <p className="card-text">{description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{content}</li>
          <li className="list-group-item">
            原價：<del>{origin_price}</del>
          </li>
          <li className="list-group-item">
            特價：<span className="fw-bold">{price}</span>
          </li>
        </ul>
        <button className="btn btn-primary" onClick={() => addCart(id)}>
          加入購物車
        </button>
      </div>
      <div className="modal fade" tabIndex="-1" ref={modalRef}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header"></div>
            <div className="modal-body">
              <p>已加入購物車</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
