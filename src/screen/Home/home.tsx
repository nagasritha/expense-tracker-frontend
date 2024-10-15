import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar/navbar";
import { PageStatus } from "../../utils/pageStatus";
import { Welcome } from "../../components/Welcome/welcome";
import { Loading } from "../../components/Loading/loading";
import { Empty } from "../../components/Empty/empty";
import { useSelector, useDispatch } from "react-redux";
import { fetchExpenses } from "../../Store/expenses.slice";
import { HomeSuccessPage } from "../../components/HomeSuccessPage/homeSuccessPage";
import { Error } from "../../components/ErrorPage/error";

export const Home = () => {
  const pageStatusObject = new PageStatus();
  const [homePageStatus, setPageStatus] = useState(pageStatusObject.initial);
  
  // Redux hooks
  const dispatch = useDispatch();
  const { expenses, page_status } = useSelector((state: any) => state.expenses);
    console.log(page_status,expenses);
  // Flag to control if expenses have been fetched already
  const [hasFetchedData, setHasFetchedData] = useState(false);

  // Show the initial status (welcome screen) for 4 seconds before fetching data
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasFetchedData) { // Only fetch data once
        dispatch<any>(fetchExpenses()); // Fetch expenses after 4 seconds
        setPageStatus(pageStatusObject.loading); // Set to loading while fetching data
        setHasFetchedData(true); // Mark data as fetched
      }
    }, 4000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [dispatch, hasFetchedData, pageStatusObject]);

  // Update the page status after the data is fetched and `page_status` changes
  useEffect(() => {
    if (page_status && homePageStatus !== page_status) {
      setPageStatus(page_status); // Update local state when `page_status` is available
    }
  }, [page_status, homePageStatus]);

  // Function to render content based on current status
  const renderContent = () => {
    switch (homePageStatus) {
      case pageStatusObject.initial:
        return <Welcome />;
      case pageStatusObject.loading:
        return <Loading />;
      case pageStatusObject.empty:
        return <Empty />;
      case pageStatusObject.success:
        return <HomeSuccessPage />;
    case pageStatusObject.error:
        return <Error/>
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="align-center-to-the-page">
        {renderContent()}
      </div>
    </div>
  );
};
