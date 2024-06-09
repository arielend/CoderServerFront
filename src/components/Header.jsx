import { Link } from 'react-router-dom'

import headerImage from '/images/headerImage.svg'
import loginIcon from '/images/login_icon.svg'
import logoutIcon from '/images/logout_icon.svg'
import userIcon from '/images/user_icon.svg'
import cartIcon from '/images/cart_icon.svg'

import { useState, useEffect } from 'react'

const Header = () => {

	const [user, setUser ] = useState({online: true})

	return (
		<header className='flex justify-between items-center w-full py-6 px-8 '>
			<div className='flex justify-between items-center'>
				<Link to='/'>
					<img src={headerImage} className='h-28 me-12'/>
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
									<img src={cartIcon} className='h-24'/>
								</Link>
							</li>
							<li>
								<Link to='/profile'>
									<img src={userIcon} className='h-20'/>
								</Link>
							</li>
							<li>
								<Link to='/logout'>
									<img src={logoutIcon} className='h-24'/>
								</Link>
							</li>						
						</> : 
						<>
							<li>
								<Link to='/login'>
									<img src={loginIcon} className='h-24'/>
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