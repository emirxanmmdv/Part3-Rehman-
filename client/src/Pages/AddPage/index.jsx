import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddPage = () => {
  const [product, setProduct] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:3100/products/");
      setProduct(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  const postProduct = async (values) => {
    const response = await axios.post(
      "http://localhost:3100/products/",
      values
    );
    getProduct();
  };

  const deleteProduct = async (id) => {
    const response = await axios.delete(`http://localhost:3100/products/${id}`);
    getProduct();
  };
  const searchBar = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="seid">
      <Formik
        initialValues={{ image: "", name: "", description: "", price: "" }}
        validationSchema={Yup.object({
          image: Yup.string().required("Required"),
          name: Yup.string()
            .matches(/^[a-zA-Z ]+?$/, "Only text allowed!")
            .required("Required"),
          description: Yup.string()
            .matches(/^[a-zA-Z ]+?$/, "Only text allowed!")
            .required("Required"),
          price: Yup.string()
            .matches(/^[1-9]\d*?$/, "Price must be higher than 0!")
            .required("Required"),
        })}
        onSubmit={(values, { resetForm }) => {
          postProduct(values);
          resetForm({ values: "" });
        }}
      >
        <Form>
          <label htmlFor="image">URL : </label>
          <Field name="image" type="text" />
          <ErrorMessage name="image" />

          <label htmlFor="name">Name: </label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" />

          <label htmlFor="description">Description :</label>
          <Field name="description" type="text" />
          <ErrorMessage name="description" />

          <label htmlFor="price">Price :</label>
          <Field name="price" type="text" />
          <ErrorMessage name="price" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <div className="sort">
        <button onClick={()=>setSort({x: "price", asc: true})}>Price (Less to More)</button>
        <button onClick={()=>setSort({x: "price", asc: false})}>Price (More to Less)</button>
        <button onClick={()=>setSort("")}>Default</button>
      </div>
      <div className="search">
        <input type="text" value={search} onChange={(e) => searchBar(e)} />
      </div>
      <div className="addTable">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {product
              ? product
                  .filter((item) =>
                    item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .sort((a, b) => {
                    if (sort && sort.asc === true) {
                      return a[sort.x] > b[sort.x]
                        ? 1
                        : a[sort.x] < b[sort.x]
                        ? -1
                        : 0;
                    } else if (sort && sort.asc === false) {
                      return a[sort.x] < b[sort.x]
                        ? 1
                        : a[sort.x] > b[sort.x]
                        ? -1
                        : 0;
                    } else {
                      return null;
                    }
                  })
                  .map((item, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <img src={item.image} />
                      </td>
                      <td>
                        <h1>{item.name}</h1>
                      </td>
                      <td>
                        <p>{item.description}</p>
                      </td>
                      <td>
                        <span>{item.price}</span>
                      </td>
                      <td>
                        <button onClick={() => deleteProduct(item._id)}>
                          X
                        </button>
                      </td>
                    </tr>
                  ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddPage;
