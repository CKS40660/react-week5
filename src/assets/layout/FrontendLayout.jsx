import { Outlet, Link } from "react-router";

function FrontendLayout() {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              首頁
            </Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="product">
                  產品
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="cart">
                  購物車
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer></footer>
    </>
  );
}

export default FrontendLayout;
