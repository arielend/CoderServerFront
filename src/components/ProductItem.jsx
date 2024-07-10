import { Link } from "react-router-dom"
const ProductItem = ({ title, photo, price, _id }) => {

    return(
        <div className="flex flex-col items-center relative border border-csGreen rounded rounded-xl bg-white text-black w-[30rem] m-8 p-8 overflow-hidden item-shadow">
            <h4 className="text-card_title">{title}</h4>
            <div className="flex w-full justify-between items-center">
                <img className="w-[12rem]" src={photo} alt={`${title} photo`}/>
                <div className="flex gap-2 flex-col content-between items-center">
                    <button>
                        <img className="h-8" src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2FisFav_icon.svg?alt=media&token=69571d99-a436-43b9-b546-fa3300526a00" alt="fav icon"/>
                    </button>
                    <button>
                        <img className="h-8" src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Fshare_icon.svg?alt=media&token=f0ffe948-9ecf-4eb1-b79d-5908e38dd0ac" alt="fav icon"/>
                    </button>
                </div>
            </div>            
            <p className="font-bold text-orange text-price mb-12">U$S {price}</p>
            <Link to={`/products/${_id}`} className="card_button transition transition-color duration-200">View Details</Link>
        </div>
    )
}

export default ProductItem