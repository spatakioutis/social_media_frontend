import './App.css'
import LoggedOut from './pages/LoggedOut'
import Post from './components/post/Post'
import Header from './components/header/Header'
import {data} from './assets/data.js'

function App() {
	const user = data[0]

	return (
		<div>
			{/* <Post 
			        username= {user.username}
					userProfPic= {user.userProfPic}
					text= {user.text}
					image= {user.image}
					likeCount= {user.likeCount}
					commentCount= {user.commentCount}/> */}
			<LoggedOut />
			{/* <Header /> */}
		</div>
	)
}

export default App
