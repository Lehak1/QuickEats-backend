import Restaurant from "../models/Restaurant"
import { Request,Response } from "express"


const searchRestaurant=async (req:Request,res:Response)=>{
try{
    const city =req.params.city;
    const searchQuery=(req.query.searchQuery as string) || "";
const selectedCuisines=(req.query.selectedCuisines as string) || "";
const sortOption=(req.query.sortOption as string) ||"lastUpdated";
const page=parseInt(req.query.page as string) || 1;

let query:any= {}
query["city"]=new RegExp(city,"i")
const cityCheck=await Restaurant.countDocuments(query)
if(!cityCheck){
    return res.status(404).json([])
}
if(selectedCuisines){
    //URL=selectedCuisines=italian,burgers,chinese
    const cuisinesArray=selectedCuisines.split(",").map((cuisine) => new RegExp(cuisine,"i"));
query["cuisines"]={$all:cuisinesArray};

//find all the restaurants where cuisines has all the items that we have recieved in request i.e cuisinesaraay
}
if(searchQuery){
  const searchRegex=new RegExp(searchQuery,"i");
  query["$or"]=[
    {restaurantName:searchRegex},
    {cuisines:{$in:[searchRegex]}},
  ];
}
const pageSize = 10;
const skip = (page - 1) * pageSize;

// sortOption = "lastUpdated"
const restaurants = await Restaurant.find(query)
  .sort({ [sortOption]: 1 })
  .skip(skip)
  .limit(pageSize)
  .lean();

const total = await Restaurant.countDocuments(query);

const response = {
  data: restaurants,
  pagination: {
    total,
    page,
    pages: Math.ceil(total / pageSize),
  },
};
console.log(query)
res.json(response);
} catch (error) {
console.log(error);
res.status(500).json({ message: "Something went wrong" });
}
}; 
 
export default {
    searchRestaurant
}