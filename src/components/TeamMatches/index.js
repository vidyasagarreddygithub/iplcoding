import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class TeamMatches extends Component {
  state = {matchDetails: [], isspin: true}

  componentDidMount() {
    this.gettheresults()
  }

  gettheresults = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    console.log(data)
    const updateddata = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        id: data.latest_match_details.id,
        result: data.latest_match_details.result,
        umpires: data.latest_match_details.umpires,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.component_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      },
      recentMatches: data.recent_matches.map(recent => ({
        umpires: recent.umpires,
        result: recent.result,
        id: recent.id,
        date: recent.date,
        manOfTheMatch: recent.man_of_the_match,
        venue: recent.venue,
        competingTeam: recent.competing_team,
        competingTeamLogo: recent.competing_team_logo,
        firstInnings: recent.first_innings,
        secondInnings: recent.second_innings,
        matchStatus: recent.match_status,
      })),
    }
    this.setState({matchDetails: updateddata, isspin: false})
  }

  getthespin = () => {
    ;<div>
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  }

  gettheteamdetails = () => {
    const {matchDetails} = this.state
    const {latestMatchDetails, teamBannerUrl} = matchDetails
    return (
      <div className="teammatchescontainer">
        <img src={teamBannerUrl} alt="team banner" className="teambanner" />
        <LatestMatch latestMatchDetails={latestMatchDetails} />
        {this.rederRecentMachCard()}
      </div>
    )
  }

  rederRecentMachCard = () => {
    const {matchDetails} = this.state
    const {recentMatches} = matchDetails
    return (
      <ul className="matchcard">
        {recentMatches.map(each => (
          <MatchCard matchdata={each} key={each.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isspin} = this.state
    return (
      <div>
        <h1>vidya</h1>
        {isspin ? this.getthespin() : this.gettheteamdetails()}
      </div>
    )
  }
}
export default TeamMatches
