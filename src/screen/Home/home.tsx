import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar/navbar";
import { PageStatus } from "../../utils/pageStatus";
import { Welcome } from "../../components/Welcome/welcome";
import { Loading} from "../../components/Loading/loading";
import { Empty } from "../../components/Empty/empty";


export const Home = ()=>{
    let pageStatusObject = new PageStatus();
    let [pageStatus,setPageStatus] = useState(pageStatusObject.initial);

    useEffect(()=>{
        setTimeout(()=>{
            setPageStatus(pageStatusObject.empty);
        },4000)
    })
    const renderContent = ()=>{
        switch(pageStatus){
            case pageStatusObject.initial:
                return <Welcome/>
            case pageStatusObject.loading:
                return <Loading/>
            case pageStatusObject.empty:
                return <Empty/>
            case pageStatusObject.empty:
                return <h1>Success</h1>
            default:
                return null;
        }
    }

    return <div>
        <Navbar/>
        <div className='align-center-to-the-page'>
            {renderContent()}
        </div>
    </div>
}