import './director-view.scss';

import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

/**
 * @class DirectorView
 * @extends React.Component
 */
export class DirectorView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movie: null,
            director: null
        };
    }

    render() {
        const { movie, director, onClick } = this.props;

        console.log('Director props: ', this.props, ' state: ', this.state)

        if (!director) return null;

        return (
            <div className="director-view">
                <Link to="/">
                    <Button variant="link">Back</Button>
                </Link>
                <div className="col-right">
                    <div className="director-name">
                        <span className="label">Name: </span>
                        <span className="value">{director.Director.Name}</span>
                    </div>
                    <div className="director-bio">
                        <span className="label">Bio: </span>
                        <span className="value">{director.Director.Bio}</span>
                    </div>
                    <div className="director-birth">
                        <span className="label">Birth: </span>
                        <span className="value">{director.Director.Birth}</span>
                    </div>
                    { director.Director.Death && 
                        <div className="director-death">
                            <span className="label">Death: </span>
                            <span className="value">{director.Director.Death}</span>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
