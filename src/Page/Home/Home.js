import Profile from "../Profile/Profile"
import SearchPage from "../search/search"
// import UserProfile from "../follow/follow"

import UserProfile from "../follow/followlist"
const Home = () =>{
    return(
        <div>
            <h1> Xin chao</h1>
            <Profile/>
            <SearchPage/>
            {/* <FollowPage/> */}
            <UserProfile/>
       </div>
    )
}
export default Home