import NavbarProduct from "../components/Navbar";
import ProductPage from "./ProductPage";

const Homepage = () => {
  const title = "Shop";
  document.title = "DumbMerch | " + title;
  return (
    <div className="bgHome">
      <NavbarProduct />
      <ProductPage />
    </div>
  );
};

export default Homepage;
