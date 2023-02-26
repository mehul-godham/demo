import React from 'react'

export default function ProductCard(props) {
    return (
        <div className='product-card'>
            <div className='product-card-image'><img src="https://picsum.photos/100/100" width="100%" height={"150px"} /></div>
            <div className='product-card-details'>
                <div className='product-card-title'><h5>{props.productObj?.title}</h5></div>
                <div className='product-card-rating'><h5>{props.productObj?.rating?.rate}</h5></div>
                <div className='product-card-description'>
                    <h4 className='tooltip'>Product description
                    <span className='tooltiptext'>{props.productObj.description}</span>
                    </h4>
                    </div>
                <div className='product-card-description'><h3>{props.productObj?.category}</h3></div>
                <div className='product-card-price'><h3>{props.productObj?.price}</h3></div>
                <div className='product-card-btn'>
                    <button>Buy</button>
                    <button>Add to Cart</button>
                </div>
            </div>
            
        </div>
    )
}
