import express from "express";
import { sellingSchema } from "../Models/productSchema.js";

export const GetAllProducts = async (req, res) => {
  const data = await sellingSchema.find({});
  res.send(data);
};

export const GetAllProductsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await sellingSchema.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json("error");
  }
};

export const PostProduct = async (req, res) => {
  try {
    const newProduct = new sellingSchema({ ...req.body });
    await newProduct.save();
    res.status(200).json("added!");
  } catch (error) {
    res.status(500).json("error");
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const {id} = req.params
    const deleteProduct = await sellingSchema.findByIdAndDelete(id)
    res.status(200).json("deleted!");
    
  } catch (error) {
    res.status(500).json("error");
  }
};
