import './index.css'

import {Link} from 'react-router-dom'
import {Component} from 'react'

class TeamCard extends Component {
  render() {
    const {listofteams} = this.props
    const {name, id, teamImageUrl} = listofteams

    return (
      <Link to={`/team-matches/${id}`}>
        <li className="card">
          <img src={teamImageUrl} alt={name} className="image" />
          <h1 className="name">{name}</h1>
        </li>
      </Link>
    )
  }
}
export default TeamCard
