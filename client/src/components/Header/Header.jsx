import { Link } from "react-router-dom"
import {Bell , Settings , HelpCircle} from 'lucide-react'

export default function Header(){

    return(
        <>
            <header>
                <div>
                    <Link to='/'>CP Pro</Link>
                    <nav>
                        <Link to='/dashboard'> DashBoard</Link>
                        <Link to='/'> Home</Link>
                        <Link to='/leaderboard'> LeaderBoard</Link>

                    </nav>
                </div>

                <div>
                    <button><Bell size={20}/></button>
                    <button><HelpCircle size={20}/></button>
                    <button><Settings size={20}/></button>
                </div>
            </header>
        </>
    )
}