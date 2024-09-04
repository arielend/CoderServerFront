import './styles.css'

const Loader = () => {
    return(
        <div className='fixed w-[100vw] h-[100vh] top-0 left-0 flex justify-center items-center z-10 bg-black/[0.8]'>
            <span className='loader'></span>
        </div>
    )
}

export default Loader