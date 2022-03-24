import React from "react";
import PropTypes from "prop-types";
import styles from "./Product.module.scss";
import { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { CardActionArea } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    width: "60%",
    height: "auto",
    display: "block",
    "margin-left": "auto",
    "margin-right": "auto",
  },
}));

const Product = (props) => {
  const productDetails = props.productDetails;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const navigateToDetails = () => {
    props.history.push("/portal/productList/" + props.productDetails.id);
  };

  return (
    <Fragment>
      <Card className={classes.root} onClick={navigateToDetails}>
        <CardActionArea>
          <CardMedia
            component="img"
            className={classes.media}
            alt={productDetails.productName}
            image={productDetails.productImage}
            title={productDetails.productName}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {productDetails.productName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`${productDetails.productValue} ${productDetails.currency}`}
            </Typography>
          </CardContent>
        </CardActionArea>
        {/* <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions> */}
      </Card>
    </Fragment>
  );
};

Product.propTypes = {
  productDetails: PropTypes.object,
};

Product.defaultProps = {
  productDetails: [],
};

export default Product;
