import React from "react"
import Navbar from "./Components/Navbar";
import {Routes, Route} from "react-router-dom"
import { collection, getDocs } from "firebase/firestore"
import { db } from './firebase';
import Products from "./Components/Products";
import Search from "./Components/Search";
import SingleProduct from "./Components/SingleProduct";
import Cart from "./Components/Cart";
import Header from "./Components/Header";
import Checkout from "./Components/Checkout";
import Footer from "./Components/Footer";
import {AuthContextProvider} from "./context/AuthContext"
import Signin from "./Components/Signin";
import Signup from "./Components/Signup"
import Related from "./Components/Related";
import Account from "./Components/Account";
import Orders from "./Components/Orders";
import AccountDetails from "./Components/AccountDetails";
import AccountInfo from "./Components/AccountInfo";
import About from "./Components/About"
import ProtectedRoute from "./Components/ProtectedRoute";
import Contact from "./Components/Contact";

function App() {

  const [products, setProducts] = React.useState([])
  const [searchTerm, setSearchTerm] = React.useState("")
  const [Categories, setCategories] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([])
  const [showCart, setShowCart] = React.useState(false);
  const [count, setCount] = React.useState(8)
  let totalCartPrice = 0

  
  cartItems.map((item, index) => totalCartPrice += item.price * item.qnt)

  function addToCart(newItem) {
    const exist = cartItems.find((x) => x.name === newItem.name)
    if (exist) {
      console.log("Product already added")
    } else {
      
      setCartItems(prevState => 
        [...prevState, newItem])
      
        setShowCart(true)
    } 
    
  }

    products?.map(prod => {
    if (Categories.indexOf(prod.category) === -1) {
        Categories.push(prod.category)
    }
    })

    function removeFromCart(id) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id))
    }
  

  const productsRef = collection(db, "products")

  React.useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsRef)
      setProducts(data.docs.map((doc) => ({...doc.data()})))
    }

    getProducts()
  },[])

  return (
   <div className="text-sm md:text-base text-neutral-900 font-main">
   <AuthContextProvider>
    <Routes>

      <Route exact path ="/" element={
        <>
        <Navbar cartItems={cartItems} setShowCart={setShowCart} />
        <Header />
        <About />
        <Search categories={Categories} setSearchTerm={setSearchTerm}  count={count} setCount={setCount}/>
        <Products products={products} searchTerm={searchTerm} count={count} setCount={setCount} />
        <Cart 
        showCart={showCart} 
        setShowCart={setShowCart} 
        cartItems={cartItems} 
        setCartItems={setCartItems}
        totalCartPrice={totalCartPrice}
        removeFromCart={removeFromCart} />
        <Footer />
        </>
        
      }>
      </Route>

      <Route path ="/:productName" element={
        <>
        <Navbar cartItems={cartItems} setShowCart={setShowCart} />
        <SingleProduct products={products} addToCart={addToCart}  />
        <Cart 
        showCart={showCart} 
        setShowCart={setShowCart} 
        cartItems={cartItems} 
        setCartItems={setCartItems}
        totalCartPrice={totalCartPrice}
        removeFromCart={removeFromCart} />
        <Related
        products={products}
         />
        <Footer />
        </>
      }>
      </Route>

      <Route path ="/checkout" element={
        <>
        <Navbar cartItems={cartItems} setShowCart={setShowCart} />
        <Checkout
        cartItems={cartItems} 
        setCartItems={setCartItems}
        totalCartPrice={totalCartPrice}
        setShowCart={setShowCart} 
        />
        <Cart 
        showCart={showCart} 
        setShowCart={setShowCart} 
        cartItems={cartItems} 
        setCartItems={setCartItems}
        totalCartPrice={totalCartPrice}
        removeFromCart={removeFromCart} />
        <Footer />
        </>
      }>
      </Route>
    
      <Route path="/signin" element ={
        <Signin/>
      }></Route>

      <Route path="/signup" element ={
        <Signup/>
      }></Route>

      <Route path="/account" element ={
        <ProtectedRoute>
          <Navbar cartItems={cartItems} setShowCart={setShowCart} />
          <Account />
          <Cart 
            showCart={showCart} 
            setShowCart={setShowCart} 
            cartItems={cartItems} 
            setCartItems={setCartItems}
            totalCartPrice={totalCartPrice}
            removeFromCart={removeFromCart} 
          />
        </ProtectedRoute>
      }></Route>

      <Route path="/account/orders" element ={
       
        <ProtectedRoute>
        
          <Navbar cartItems={cartItems} setShowCart={setShowCart} />
          <Account />
          <Orders />
          <Cart 
            showCart={showCart} 
            setShowCart={setShowCart} 
            cartItems={cartItems} 
            setCartItems={setCartItems}
            totalCartPrice={totalCartPrice}
            removeFromCart={removeFromCart} 
          />
          
        
        </ProtectedRoute>
        
        
      }></Route>

      <Route path="/account/details" element ={
        <ProtectedRoute>
          <Navbar cartItems={cartItems} setShowCart={setShowCart} />
          <Account />
          <AccountDetails />
          <Cart 
            showCart={showCart} 
            setShowCart={setShowCart} 
            cartItems={cartItems} 
            setCartItems={setCartItems}
            totalCartPrice={totalCartPrice}
            removeFromCart={removeFromCart} 
          />
        </ProtectedRoute>
      }></Route>

      <Route path="/account/edit" element ={
        <ProtectedRoute>
        <Navbar cartItems={cartItems} setShowCart={setShowCart} />
        <Account />
        <AccountInfo />
        <Cart 
            showCart={showCart} 
            setShowCart={setShowCart} 
            cartItems={cartItems} 
            setCartItems={setCartItems}
            totalCartPrice={totalCartPrice}
            removeFromCart={removeFromCart} 
          />
        </ProtectedRoute>
      }></Route>

      <Route path="/contact" element={<>
        <Navbar cartItems={cartItems} setShowCart={setShowCart} />
        <Contact />
        <Cart 
            showCart={showCart} 
            setShowCart={setShowCart} 
            cartItems={cartItems} 
            setCartItems={setCartItems}
            totalCartPrice={totalCartPrice}
            removeFromCart={removeFromCart} 
          />
        </>
      }>
        </Route>
    
    </Routes>
   </AuthContextProvider>
   </div>
  );
}

export default App;
