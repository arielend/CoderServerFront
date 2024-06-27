import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

	const [user, setUser ] = useState({online: false})

	return (
		<header className='flex justify-between items-center w-full py-6 px-8 '>
			<div className='flex justify-between items-center'>
				<Link to='/'>
					<img src='https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/images%2FheaderImage.svg?alt=media&token=7ed650f9-4e73-4f83-93cb-9fc1b9064b37' className='h-28 me-12'/>
				</Link>
				<ul className="flex gap-8 text-csGreen">
					<li>
						<Link to={'/products'} className='nav_link' title='Products'>Products</Link>
					</li>
					<li>
						<Link to={'/chat'} className='nav_link' title='chat'>Chat</Link>						
					</li>
				</ul>
			</div>
			<div>
				<ul className='flex gap-8 items-center'>
					{
						user.online ? <>
							<li>
								<Link to='/cart'>
									<img src='https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Fcart_icon.svg?alt=media&token=4bdd38d2-fcf3-41bd-8c88-02116bf5ccb1' className='h-24'/>
								</Link>
							</li>
							<li>
								<Link to='/profile'>
									<img src='https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Fuser_icon.svg?alt=media&token=fde90760-8809-46a5-a0ed-1ac290ddd72b' className='h-20'/>
								</Link>
							</li>
							<li>
								<Link to='/logout'>
									<img src='https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Flogout_icon.svg?alt=media&token=2ba042b8-c695-4db9-a116-23278c7758ed' className='h-24'/>
								</Link>
							</li>						
						</> : 
						<>
							<li>
								<Link to='/login'>
									<img src='https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Flogin_icon.svg?alt=media&token=6bff8f3a-1f32-4f99-81b9-93f2c2655283' className='h-24'/>
								</Link>
							</li>
						</>
					}
				</ul>
			</div>
		</header>
	)
}

export default Header