import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import * as bootstrap from "bootstrap";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const getCart = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      setCartProducts(response.data.data.carts);
      setTotalPrice(response.data.data.final_total);
    } catch (error) {
      console.error(error.response || error);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCart();
  }, [getCart]);

  const delCarts = async () => {
    try {
      await axios.delete(`${API_BASE}/api/${API_PATH}/carts`);
      await getCart();
    } catch (error) {
      console.error(error.response || error);
    }
  };
  const delCartProduct = async (id) => {
    try {
      // 注意cart沒有s，id是拿購物車的id而非product
      await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${id}`);
      await getCart();
    } catch (error) {
      console.error(error.response);
    }
  };
  const updateCartQty = async (id, productId, qty) => {
    try {
      if (qty === 0) {
        await delCartProduct(id);
        return;
      }
      await axios.put(`${API_BASE}/api/${API_PATH}/cart/${id}`, {
        data: {
          product_id: productId,
          qty,
        },
      });

      await getCart();
    } catch (error) {
      console.error(error.response);
    }
  };
  const modalRef = useRef(null);
  useEffect(() => {
    modalRef.current = new bootstrap.Modal(modalRef.current);
  }, []);
  const openDelAlert = () => {
    modalRef.current.show();
  };
  return (
    <>
      <div className="container">
        <h2>購物車列表</h2>
        <div className="text-end my-4">
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={openDelAlert}
          >
            清空購物車
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">品名</th>
              <th scope="col">數量</th>
              <th scope="col" className="text-end">
                小計
              </th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((cartProduct) => {
              const { id, final_total, qty, product } = cartProduct;
              return (
                <tr key={id}>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        delCartProduct(id);
                      }}
                    >
                      刪除
                    </button>
                  </td>
                  <th scope="row">{product.title}</th>
                  <td className="d-flex justify-content-center ">
                    <div class="input-group mb-3" style={{ width: "150px" }}>
                      <button
                        class="btn btn-outline-secondary"
                        type="button"
                        disabled={qty < 0}
                        onClick={() => updateCartQty(id, product.id, qty - 1)}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        class="form-control text-center"
                        aria-label="qty"
                        value={qty}
                      />
                      <button
                        class="btn btn-outline-secondary"
                        type="button"
                        onClick={() => updateCartQty(id, product.id, qty + 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-end">{final_total}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-end" colSpan="3">
                總計
              </td>
              <td className="text-end">{totalPrice}</td>
            </tr>
          </tfoot>
        </table>
        <div className="modal fade" tabIndex="-1" ref={modalRef}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>是否清空購物車</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  離開
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={delCarts}
                >
                  清空購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
