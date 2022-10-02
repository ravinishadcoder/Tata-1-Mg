import {
  Box,
  Button,
  Flex,
  Grid,
  Select,
  Spacer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import prodstyles from "../css/allProducts.module.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByBrandAPI,
  getAllProductsAPI,
  getDiscountProductAPI,
  sortItems,
} from "../../actions/product.actions";
import { AllBrands } from "../../constants/function.constants.js/function.constants";
import AllProduct from "../../Components/allProductCart";
import {
  GET_ALL_PRODUCT_SUCCESS,
  GET_FILTERED_PROUDCT_SUCCESS,
} from "../../constants/reducer.constants.js/product.constants";

const AllProductPage = () => {
  const { productList } = useSelector((state) => state);
  const { loading, success, products, filteredProducts } = productList;
  // console.log("productLIst", productList);
  // console.log("products", products);
  // console.log("filteredProducts", filteredProducts);
  const [arr, setArr] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState([]);
  const dispatch = useDispatch();
  // console.log("filteredProductList", filteredProductList);
  const brands = AllBrands(products);

  const discountValues = [10, 15, 20, 25];

  const pageno = [];

  useEffect(() => {
    dispatch(getAllProductsAPI());
  }, []);

  const filterByBrand = () => {
    console.log("arr", arr);
    let newProductArr = [];
    if (arr.length) {
      for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (products[i]["brand"] == arr[j]) {
            newProductArr.push(products[i]);
          }
        }
      }
      dispatch(filterByBrandAPI(newProductArr));
    } else {
      dispatch(filterByBrandAPI(products));
    }
  };

  useEffect(() => {
    setFilteredProductList(filteredProducts);
  }, [productList]);

  useEffect(() => {
    let payload = arr.join(",");
    // dispatch(filterByBrandAPI(payload));
    filterByBrand();
  }, [arr]);

  const filterByBrandHandler = (e) => {
    if (e.target.checked) {
      setArr([...arr, e.target.value]);
    } else {
      let temp = arr.filter((el) => el !== e.target.value);
      setArr(temp);
    }
  };

  const onDicountFilterHanlde = (e) => {
    // console.log(e.target.checked, e.target.value);
    dispatch(getDiscountProductAPI(Number(e.target.value - 1)));
  };

  const handleSort = (e) => {
    // console.log(e.target.value);
    dispatch(sortItems(e.target.value));
  };

  const handleResetFilters = (e) => {
    console.log("Reset");
    // console.log("products", products);
    dispatch(getDiscountProductAPI(0));
    // dispatch({ type: GET_ALL_PRODUCT_SUCCESS, payload: products });
  };

  const decrpage = () => {};

  const incrpage = () => {};

  return (
    <div>
      <Flex>
        <Box>
          <div className={prodstyles.prodpagediv}>
            <div className={prodstyles.filterdiv}>
              <div
                style={{
                  padding: "15px",
                  borderBottom: "1px solid silver",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                FILTER
              </div>

              <div
                style={{ padding: "15px", borderBottom: "1px solid silver" }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  BRANDS
                </div>
                {brands.map((el, i) => {
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        paddingTop: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="checkbox"
                          value={el.name}
                          onChange={filterByBrandHandler}
                          style={{ width: "15px", height: "15px" }}
                        />
                        <p style={{ paddingLeft: "10px" }}>{el.name}</p>
                      </div>
                      <p>{el.count}</p>
                    </div>
                  );
                })}
              </div>

              <div style={{ padding: "15px" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  DISCOUNTS
                </div>

                {discountValues.map((el, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        paddingTop: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="radio"
                          name="discount"
                          value={el}
                          onChange={onDicountFilterHanlde}
                          style={{ width: "15px", height: "15px" }}
                        />
                        <p style={{ paddingLeft: "10px" }}>{el} % and above</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button onClick={() => handleResetFilters()}>
                Reset Filters
              </Button>
            </div>
          </div>
        </Box>
        <Box>
          <Flex
            justifyContent="space-between"
            marginRight="2rem"
            padding="1rem"
            alignItems="center"
          >
            <Text>All Products</Text>

            <Flex gap="1rem" alignItems="center" justifyContent="center">
              <Text margin="auto" width="100%">
                Sort By
              </Text>
              <Select onChange={handleSort}>
                <option value="rel">Relevance</option>
                <option value="plth">Price: Low to High</option>
                <option value="phtl">Price: High to Low</option>
                <option value="rlth">Rating: Low to High</option>
                <option value="rhtl">Rating: High to Low</option>
              </Select>
            </Flex>
          </Flex>

          {loading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              marginLeft="100%"
              marginTop="50%"
            />
          ) : (
            <Grid
              width={"100%"}
              // border={"1px solid orange"}
              templateColumns={[
                "repeat(2, 1fr)",
                "repeat(3, 1fr)",
                "repeat(4, 1fr)",
              ]}
              gap={4}
            >
              {filteredProductList.map((el, i) => (
                <AllProduct product={el} key={i} />
              ))}
            </Grid>
          )}

          <div
            style={{
              backgroundColor: "white",
              boxShadow: "rgba(0, 0, 0, 0.07) 0px 0px 7px 0px",
            }}
          >
            {success && (
              <div className={prodstyles.pagination}>
                <div onClick={decrpage} className={prodstyles.othernum}>
                  Previous
                </div>
                {pageno.map((el) => {
                  return (
                    // <div>
                    //   {el == page ? (
                    //     <div className={prodstyles.numcolor}>{el}</div>
                    //   ) : (
                    //     <div
                    //       onClick={() => setpage(el)}
                    //       className={prodstyles.othernum}
                    //     >
                    //       {el}
                    //     </div>
                    //   )}
                    // </div>
                    <div>Page No Here</div>
                  );
                })}
                <div onClick={incrpage} className={prodstyles.othernum}>
                  Next
                </div>
              </div>
            )}
          </div>
        </Box>
      </Flex>
    </div>
  );
};

export default AllProductPage;
