import { useCount } from '../hooks/useCount.js'

const ItemCount = ({onAdd}) => {

    // stock debe llegar por props
    const stock = 10

    const {count, decrement, increment} = useCount((stock>0 ? 1 : 0), stock)

    return(
        <div className="flex flex-col bg-white">
            <div className="flex justify-between items-center">
                <button className="" onClick={decrement} disabled={stock==0}>
                    <img className="h-[2rem]" src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Ficon_minus.svg?alt=media&token=3899391c-9d6a-43e6-852c-3e61ec5df0e8" alt="Icon minus"/>
                </button>
                <label className="text-[1.5rem]">{count}</label>
                <button className="" onClick={increment} disabled={stock==0}>
                    <img className="h-[2rem]" src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Ficon_plus.svg?alt=media&token=fe6f5fdf-57f1-48b0-8b88-6550e3cc9087" alt="Icon plus"/>
                </button>
            </div>            
            <button className="green_button" onClick={() => onAdd(count)} disabled={count==0}>Add to cart</button>            
        </div>
    )
}

export default ItemCount