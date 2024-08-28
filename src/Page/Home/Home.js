import Profile from "../Profile/Profile"
import SearchPage from "../search/search"
import FollowPage from "../follow/follow"


const Home = () =>{
    return(
        <div>
            <h1> Xin chao</h1>
            <Profile/>
            <SearchPage/>
            <FollowPage/>
        </div>
    )
}
export default Home