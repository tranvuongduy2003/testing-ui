import { getAllBrands } from "@/apis/brand.api";
import { getAllCategories } from "@/apis/category.api";
import { getAllProducts, searchProductsByName } from "@/apis/product.api";
import { useAppStore } from "@/stores/useAppStore";
import { useBrandStore } from "@/stores/useBrandStore";
import { useCategoriesStore } from "@/stores/useCategoryStore";
import { useProductStore } from "@/stores/useProductStore";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, List, Row, Select, Skeleton, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Banner from "./components/Banner";
import FilterBar from "./components/FilterBar";
import ProductCard from "./components/ProductCard";

const ProductsPage: React.FunctionComponent = () => {
  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const products = useProductStore((state) => state.products);
  const filteredProducts = useProductStore((state) => state.filteredProducts);
  const setFilteredProducts = useProductStore(
    (state) => state.setFilteredProducts
  );
  const setProducts = useProductStore((state) => state.setProducts);
  const setSortBy = useProductStore((state) => state.setSortBy);
  const setCategories = useCategoriesStore((state) => state.setCategories);
  const setBrands = useBrandStore((state) => state.setBrands);

  const [searchValue, setSearchValue] = useState<string>("");

  const fetchProductData = useRef<any>();

  useEffect(() => {
    fetchProductData.current = async () => {
      setIsLoading(true);
      try {
        const { data: productData } = await getAllProducts();
        const { data: categoryData } = await getAllCategories();
        const { data: brandData } = await getAllBrands();

        setProducts(productData);
        setCategories(categoryData);
        setBrands(brandData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchProductData.current();
  }, []);

  const handleSearchProduct = async () => {
    setIsLoading(true);
    try {
      if (searchValue && searchValue !== "") {
        const { data } = await searchProductsByName(searchValue);
        setProducts(data);
      } else {
        const { data } = await getAllProducts();
        setProducts(data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <Banner />
      <Row className="my-10 px-28" gutter={56}>
        <Col span={6}>{isLoading ? <Skeleton /> : <FilterBar />}</Col>
        <Col span={18}>
          <Row gutter={16}>
            <Col flex={1}>
              <Input
                size="large"
                prefix={<SearchOutlined />}
                placeholder="Search..."
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Col>
            <Col className="w-40">
              <Button
                onClick={handleSearchProduct}
                type="primary"
                className="w-full bg-primary"
                size="large"
              >
                Search
              </Button>
            </Col>
          </Row>
          <div className="flex items-center justify-between mt-10 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl text-neutral-900">Product Results</span>
              <span className="text-xs text-neutral-500">{`${
                filteredProducts ? filteredProducts.length : products.length
              } products`}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base text-neutral-500">Sort by</span>
              <Select
                defaultValue="low"
                className="w-40 p-0 m-0 sorted-by-select"
                bordered={false}
                options={[
                  { value: "low", label: "Price-low to high" },
                  { value: "high", label: "Price-high to low" },
                  { value: "last", label: "Last posted" },
                  { value: "newest", label: "Newest posted" },
                ]}
                onChange={(value) => setSortBy(value)}
              />
            </div>
          </div>

          {!isLoading ? (
            <List
              grid={{ gutter: 24, column: 3 }}
              pagination={{
                position: "bottom",
                align: "center",
                defaultPageSize: 9,
              }}
              dataSource={filteredProducts || products}
              renderItem={(item) => (
                <List.Item>
                  <ProductCard data={item} />
                </List.Item>
              )}
            />
          ) : (
            <div className="flex justify-center w-full">
              <Spin spinning={isLoading} size="large" />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProductsPage;
