import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";
import { AvTimer } from "@mui/icons-material";

const Card = ({ item }) => {
  const startDate = new Date()
  const endDate = new Date(item?.attributes?.endDate)
  const diff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
  const percentageval = () => {
    var final =  0;
    const  minval = item?.attributes?.MinFundedquantity==null?0:item?.attributes?.MinFundedquantity;
    const total_order = item?.attributes?.total_funded==null?0:item?.attributes?.total_funded;
    if(total_order != null && minval != null){
      var final = (total_order / minval) * 100;
    }
    // if(final>100){
    //   final = 100;
    // }
    return final
  }
  return (
    <Link className="link" to={`/product/${item.id}`}>
      <div className="card">
        <div className="image">
          {item?.attributes.isNew && <span>New Arrival</span>}
          {item?.attributes?.img?.data?.attributes?.url && (
          <img
            src = {`${process.env.REACT_APP_IMAGE_ACCESS_URL + item.attributes?.img?.data?.attributes?.url}`}
            
            alt=""
            className="mainImg"
          />
          )}
          <img
            src={
              process.env.REACT_APP_IMAGE_ACCESS_URL + item.attributes?.img2?.data?.attributes?.url
            }
            alt=""
            className="secondImg"
          />
        </div>
        <h2>{item?.attributes.title}</h2>
        <div className="prices">
   
          <h3>${item?.attributes.price}</h3>
          
        </div>
        <div className='crowd_div'>
            <div class="meter">
                <span style={{width: (percentageval()>100?100:percentageval())+"%"}}></span>
            </div>
            <div className='count_funding'>
                <div className={`percent_total ${percentageval()>=100?'greenfunded':''}`}>{percentageval()}% Funded</div>
                <div className='sold_total'><AvTimer/>{diff > 0 ? diff : 0}d left</div>
            </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
