

const CartItem = ({...item}) => {
    return(
        <div className="">                            
            <img src={photo} width="70" />
            <div className="">
                <h2>{}</h2>
                <div className="flex justify-evenly">
                    <span className="">Price: <b>${price}</b></span>
                    <span className="">Quantity: <b>{quantity}</b> u.</span>
                    <span className="text-white">Subtotal: $ {subtotal} </span>                    
                </div>
            </div>
            <div className="">
                <button id="btn_cartDelete" 
                    onclick="deleteCartItem('{{this._id}}')"
                    style="background-color: transparent; border: none;"
                >
                    <img src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Ftrash_icon.svg?alt=media&token=9cf26d45-6149-4a96-a0c4-d10174c13f68" alt="Delete" title="Delete" />
                </button>
            </div>
        </div>
    )
}

export default CartItem