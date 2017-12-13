import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * @function Idea
 * @description the Idea component.
 * @returns {string} The HTML markup for the Idea component
 */
export default class Idea extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   * @memberof Idea
   */
  constructor(props) {
    super(props);
    this.state = { publicIdea: [] };
  }

  /**
  * @method componentWillReceiveProps
  * @description This listening to event in the AppStore
  * @param {object} nextProps
  * @return {void}
  * @memberof MainIdea
  */
  componentWillReceiveProps(nextProps) {
    if (nextProps.publicIdea[0] !== undefined) {
      this.setState({
        publicIdea: nextProps.publicIdea
      });
    }
  }

  /**
  * @description - render method, React lifecycle method
  * @returns {object} CommentPage component
  */
  render() {
    if (this.state.publicIdea[0] !== undefined) {
      return (
        <div className="idea">
          <div className="row">
            {this.state.publicIdea.map(idea =>
              (
                <div className="col s12 m6" key={idea._id}>
                  <div className="card">
                    <div className="card-content">
                      <span
                        className="card-title activator grey-text text-darken-4"
                      >{idea.title}
                        <i className="material-icons right">more_vert
                        </i>
                      </span>
                      <p>
                        <a href="#">
                          {`${idea.description.slice(0, 20)} ....`}
                        </a>
                      </p>
                    </div>
                    <div className="card-reveal black-text">
                      <span
                        className="card-title black-text"
                      >{idea.title}
                        <i className="material-icons right">close
                        </i>
                      </span>
                      <p>{idea.description}.</p>
                      <p>Author:{' '}
                        <span className="deep-purple-text">
                          {idea.author.name}
                        </span>
                      </p>
                    </div>
                    <div className="card-action">
                      <div className="row ideacard">
                        <span className="black-text col s4 m4">
                          {idea.category[0]}
                        </span>
                        <Link
                          to={`/dashboard/${idea._id}`}
                          className="col s4 m4"
                        >
                          <i
                            href=""
                            role="button"
                            tabIndex="0"
                            className="material-icons black-text"
                          >more
                          </i>
                        </Link>
                        <i
                          role="button"
                          tabIndex="0"
                          className="material-icons black-text edit"
                        >
                          share
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      );
    }
    return true;
  }
}

Idea.propTypes = {
  publicIdea: PropTypes.array.isRequired
};
