import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import NotFound from "../../components/NotFound/NotFound";
import Search from "../../components/Search/Search";
import Tags from "../../components/Tags/Tags";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
// import { useLoading } from '../../Hooks/useLoading';
import {
  getAll,
  getAllByTags,
  getAllTags,
  search,
} from "../../services/foodService";

const initialState = { foods: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "FOODS_LOADED":
      return { ...state, foods: action.payload };

    case "TAGS_LOADED":
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

function Homepage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags } = state;
  const { searchTerm, tag } = useParams(); // useParams is a hook provided by React Router that allows you to access the values of parameters in the URL
  // const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    getAllTags().then((tags) =>
      dispatch({ type: "TAGS_LOADED", payload: tags })
    );

    const loadFoods = tag
      ? getAllByTags(tag)
      : searchTerm
      ? search(searchTerm)
      : getAll();

    loadFoods
      .then((foods) => dispatch({ type: "FOODS_LOADED", payload: foods }))
      .catch((error) => {
        console.log("Rate Limit", error);
        toast.warning("Please Wait for few Minutes");
      });
  }, [searchTerm, tag]);

  ///returning
  // console.log(tags)
  return (
    <>
      <Search />
      <Tags tags={tags} />

      {foods.length === 0 && <NotFound />}

      <Thumbnails foods={foods} />
    </>
  );
}

export default Homepage;
