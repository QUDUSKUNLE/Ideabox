import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatLink from '../../../helper/formatLink';

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
    } else { this.setState({ publicIdea: [] }); }
  }

  /**
  * @description - render method, React lifecycle method
  * @returns {object} CommentPage component
  */
  render() {
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
                    <p className="author">Author:{' '}
                      <span>
                        {idea.author.name}
                      </span>
                    </p>
                  </div>
                  <div className="card-action">
                    <div className="row ideacard">
                      <span className="black-text col s4 m4 category">
                        {idea.category[0]}
                      </span>
                      <Link
                        to={`/dashboard/${idea._id}`}
                        className="col s4 m4"
                      >
                        <i
                          role="button"
                          tabIndex="0"
                          className="material-icons black-text tooltipped edit"
                          data-position="top"
                          data-delay="50"
                          data-tooltip="Comment"
                        >comment
                        </i>
                      </Link>
                      <a
                        href={`https://twitter.com/intent/tweet?text=${formatLink(idea.title)}.%20You%20should%20read%20this%20&url=${window.location.origin}/dashboard/${idea._id}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <i
                          role="button"
                          tabIndex="0"
                          className="material-icons black-text edit tooltipped"
                          data-position="top"
                          data-delay="50"
                          data-tooltip="share on twitter"
                        >
                          share
                        </i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

Idea.propTypes = {
  publicIdea: PropTypes.array.isRequired
};
