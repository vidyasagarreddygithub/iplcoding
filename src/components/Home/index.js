import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class Home extends Component {
  state = {listofteams: [], isspin: true}

  componentDidMount() {
    this.getthematchdetails()
  }

  getthematchdetails = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const converteddata = data.teams.map(eachItem => ({
      name: eachItem.name,
      id: eachItem.id,
      teamImageUrl: eachItem.team_image_url,
    }))
    this.setState({listofteams: converteddata, isspin: false})
  }

  getspin = () => (
    <div>
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  gettheipldetails = () => {
    const {listofteams} = this.state
    return (
      <ul className="listofelements">
        {listofteams.map(each => (
          <TeamCard listofteams={each} key={each.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isspin} = this.state
    return (
      <div className="bg-container">
        <div className="ipllogocontainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="logo"
            className="ipllogo"
          />
          <h1 className="mainhead">IPL Dashboard</h1>
        </div>
        <div>{isspin ? this.getspin() : this.gettheipldetails()}</div>
      </div>
    )
  }
}
export default Home
