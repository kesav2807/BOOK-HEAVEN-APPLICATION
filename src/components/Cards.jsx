import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cards({ item }) {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate('/cart', { state: { item } }); // Navigating to /cart with item data
  };

  return (
    <div className="mt-4 my-3 p-3">
      <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
        <figure className="h-48 w-full overflow-hidden flex items-center justify-center">
          <img src={item.image} alt="" className="max-h-full max-w-full object-contain" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.title}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>{item.name}</p>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">${item.price}</div>
            <div
              className="cursor-pointer rounded-full border-[2px] hover:bg-pink-500 duration-200 hover:text-white px-2 py-1"
              onClick={handleBuyNow}
            >
              Buy Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
