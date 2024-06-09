const ProductItem = ({title, photo, price}) => {
    return(
        <div className="flex flex-col items-center relative border border-csGreen rounded rounded-xl bg-white text-black w-[40rem] m-8 p-8 overflow-hidden item-shadow">
            <h4 className="text-card_title">{title}</h4>
            <div className="flex w-full justify-between items-center">
                <img className="w-[18rem]" src={photo}/>
                <div className="flex gap-2 flex-col content-between items-center">
                    <button>
                        <img className="h-16" src="/images/isFav_icon.svg" alt="fav icon"/>
                    </button>
                    <button>
                        <img className="h-16" src="/images/share_icon.svg" alt="fav icon"/>
                    </button>
                </div>
            </div>
            <p className="font-bold text-orange text-price mb-12">$ {price}</p>
            <a href="/products/{_id}" className="card_button transition transition-color duration-200">View Details</a>
        </div>
    )
}

export default ProductItem