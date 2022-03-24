import React, { lazy, Suspense } from "react";

const productList = lazy(() => import("./productList"));

const productList = (props) => (
  <Suspense fallback={null}>
    <productList {...props} />
  </Suspense>
);

export default Components / productList;
