import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./ProductDetails.module.scss";
import httpService from "../../core/services/httpService";
import { APIURL } from "./../../common/constants/API";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { ActionsKey } from "../../common/constants/constants";
import { shallowEqual } from "react-redux";
import { cartCount } from "../../core/services/centralService";
import CustomizedDialogs from './../../common/components/GenericDialogModel/GenericDialogModel';
import { DialogContext } from './../../core/context/dialog-context';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const ProductDetails = (props) => {
  const classes = useStyles();
  let [productDetails, setProductDetails] = useState({});
  let [selectedQuantity, setQuantity] = useState(1);
  let [quantityItems, setQuantityItems] = useState([]);
  const [isPreview, setIsPreview] = useState(false);
  const state = useSelector((state) => state.ordersReducer)
  const dispatch = useDispatch()
  console.log("props =", productDetails);
  console.log("state =", state);
  useEffect(() => {
    httpService.get(APIURL.productList).then((res) => {
      const productData = res.data.result.filter(
        (product) => product.id == props.match.params.id
      );
      setProductDetails(productData.length > 0 ? productData[0] : {});
    });
  }, []);
  useEffect(() => {
    const listItem = [];
    if (productDetails.hasOwnProperty("maxOrderQuantity")) {
      for (let qty = 1; qty <= productDetails.maxOrderQuantity; qty++) {
        console.log("qty =", qty);
        listItem.push(
          <MenuItem key={qty} value={qty}>
            {qty}
          </MenuItem>
        );
      }
    }
    setQuantityItems(listItem);
  }, [productDetails]);

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };
  const AddToCartProduct = () => {
    const orderDetails = {productDetails:productDetails,quantity:selectedQuantity}
    dispatch({
      newProduct: { ...orderDetails },
      type: ActionsKey.addToCart,
    });
    dispatch({
      type: ActionsKey.getCartItems,
    });
  };
  const dialogClose = (value)=> {
    setIsPreview(value);
    }
  return (
    <div className="row">
      <div className="col-6">
        <img src={productDetails.productImage} style={{ width: "80%" }} />
      </div>
      <div className="col-6">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-4">
                <label>Quantity</label>
              </div>
              <div className="col-8">
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Quantity
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedQuantity}
                    onChange={handleChange}
                  >
                    {quantityItems}
                   
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button type="button" onClick={AddToCartProduct}>
                  Add to Cart 
                  - {cartCount(state.cartItems)}
                </button>
                <button
                  type="button"
                  onClick={()=>{setIsPreview(true)}}
                >
                  Go to Cart
                </button>
               { isPreview && <CustomizedDialogs open={isPreview} close={()=>{dialogClose(false)}}></CustomizedDialogs>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductDetails.propTypes = {};

ProductDetails.defaultProps = {};

export default ProductDetails;
