import capitalize from 'capitalize';
import Idea from '../models/Idea';
import pagination from '../helpers/pagination';

/**
 * @class IdeaController
 */
class IdeaController {
  /**
   * Routes: POST: /api/v1/users/ideas
   * @param {any} req user request object
   * @param {any} res server response
   * @return {void}
   * @memberOf IdeaController
   */
  static createIdea(req, res) {
    if ((!req.body.title) || (!req.body.description) || (!req.body.category) ||
      (!req.body.access)) {
      return res.status(400).send({
        success: false,
        error: 'Either Title, description, category or access must not be empty'
      });
    }
    if (((capitalize(req.body.access) !== 'Public') ||
    (capitalize(req.body.access) === 'Private')) &&
      ((capitalize(req.body.access) === 'Public') ||
      (capitalize(req.body.access) !== 'Private'))) {
      return res.status(400).send({
        success: false,
        error: 'Access must be public or private'
      });
    }
    // Check if idea title already exist
    Idea.findOne({ title: capitalize(req.body.title) })
      .exec((err, existingTitle) => {
        if (existingTitle) {
          return res.status(409).send({
            success: false,
            error: 'existingTitle',
            message: 'Idea title must be unique'
          });
        }

        const newIdea = new Idea({
          title: capitalize(req.body.title.trim()),
          description: capitalize(req.body.description.trim()),
          category: capitalize(req.body.category.trim()),
          access: capitalize(req.body.access.trim()),
          author: {
            id: req.decoded.token.user._id,
            name: req.decoded.token.user.username
          }
        });
        newIdea.save((err, createdIdea) => {
          if (err) {
            return res.status(500).send({
              success: false,
              error: 'Internal server error'
            });
          }
          // return new Idea
          return res.status(201).send({
            success: true,
            message: 'Your Idea has been created successfully',
            createdIdea
          });
        });
      });
  }

  /**
   * Routes: PUT: /api/v1/users/ideas/:ideaId
   * @param {any} req user request object
   * @param {any} res server response
   * @return {void}
   * @memberOf IdeaController
   */
  static editIdea(req, res) {
    if ((!req.body.title) || (!req.body.description) || (!req.body.category) ||
      (!req.body.access)) {
      return res.status(400).send({
        success: false,
        error: 'Either title, description, category or access must not be empty'
      });
    }
    if (((capitalize(req.body.access) !== 'Public') ||
      (capitalize(req.body.access) === 'Private')) &&
      ((capitalize(req.body.access) === 'Public') ||
        (capitalize(req.body.access) !== 'Private'))) {
      return res.status(400).send({
        success: false,
        error: 'Access must be public or private'
      });
    }
    Idea.findByIdAndUpdate(
      { _id: req.params.ideaId },
      {
        $set: { title: capitalize(req.body.title.trim()) },
        description: capitalize(req.body.description.trim()),
        access: capitalize(req.body.access.trim()),
        category: capitalize(req.body.category.trim()),
        status: 'Edited'
      },
      { new: true }
    ).exec((err, updatedIdea) => {
      if (updatedIdea) {
        return res.status(200).send({
          success: true,
          message: 'Idea updated successfully',
          status: 'edited',
          updatedIdea: {
            title: updatedIdea.title,
            description: updatedIdea.description,
            access: updatedIdea.access,
            category: updatedIdea.category,
            status: updatedIdea.status
          }
        });
      }
      res.status(404).send({
        error: 'Idea not Found',
        success: false
      });
    }).catch(() => res.status(500).send({ error: 'Internal server error' }));
  }

  /**
   * Routes: DELETE: /api/v1/users/ideas/:ideaId
   * @param {any} req user request object
   * @param {any} res server response
   * @return {void}
   * @memberOf IdeaController
   */
  static deleteIdea(req, res) {
    Idea.findById({ _id: req.params.ideaId })
      .exec()
      .then((idea) => {
        if (idea) {
          Idea.remove({
            _id: req.params.ideaId
          }).then(() => res.status(202).send({
            success: true,
            message: 'Idea deleted successfully'
          })).catch(error => res.status(500).send({
            success: false,
            error: error.message
          }));
        }
        if (!idea) {
          res.status(404).send({
            success: false,
            error: 'Idea does not exist'
          });
        }
      }).catch(error => res.status(401).send({
        success: false,
        message: 'Unathorized, invalid idea identity',
        error: error.message
      }));
  }

  /**
   * Routes: GET: /api/v1/users/ideas/public?offset=A?limit=B
   * @description This fetch all public ideas
   * @param {any} req user request object
   * @param {any} res server response
   * @return {void}
   * @memberOf IdeaController
   */
  static publicIdea(req, res) {
    const offset = parseInt(req.query.offset, 10);
    const limit = parseInt(req.query.limit, 10);
    let count;
    Idea.count({
      access: { $eq: 'Public' }
    }, (err, isCount) => {
      count = isCount;
      Idea.find({})
        .where({ access: { $eq: 'Public' } })
        .skip(offset)
        .limit(limit)
        .exec()
        .then(ideas => res.status(200).send({
          ideas,
          pageInfo: pagination(count, limit, offset)
        }));
    });
  }

  /**
   * Routes: GET: /api/v1/users/ideas/user/ideas
   * @description This fetch all ideas created by a user
   * @param {any} req user request object
   * @param {any} res server response
   * @return {void}
   * @memberOf IdeaController
   */
  static userIdeas(req, res) {
    Idea.find({})
      .where({
        'author.name': req.decoded.token.user.username,
        'author.id': req.decoded.token.user._id
      })
      .exec((err, searchResponse) => {
        if (err) {
          return res.status(500).send({
            success: false,
            error: 'Internal server error',
          });
        }
        // return new search response
        return res.status(200).send({
          success: true,
          searchResponse
        });
      });
  }


  /**
   * Routes: GET: /api/v1/users/ideas/:ideaId
   * @description This fetch idea by IdeaId
   * @param {any} req user request object
   * @param {any} res server response
   * @return {void}
   * @memberOf IdeaController
   */
  static fetchIdea(req, res) {
    if (!req.params.ideaId) {
      return res.status(400).send({
        success: false,
        error: 'Search query must be defined'
      });
    }

    // Get all Public
    Idea.findById({ _id: req.params.ideaId })
      .exec()
      .then((idea) => {
        if (idea) {
          return res.status(200).send({
            success: true,
            idea
          });
        }
        if (!idea) {
          return res.status(404).send({
            success: false,
            error: 'Idea does not exist'
          });
        }
      }).catch(error =>
        res.status(401).send({
          success: false,
          message: 'Unathorized, invalid idea identity',
          error: error.message
        }));
  }

  /**
   * Routes: GET:
   * /api/v1/users/ideas?category=category&offset=offset&limit=ideaLimit}
   * @description This search for ideas base on category
   * @param {any} req user request object
   * @param {any} res server response
   * @return {void}
   * @memberOf IdeaController
   */
  static filterIdeas(req, res) {
    if (!req.query.category || (req.query.category.trim() === '')) {
      return res.status(400).send({
        success: false,
        error: 'Filter query must not be empty'
      });
    }
    // Filter by category
    const { category } = req.query;
    const offset = parseInt(req.query.offset, 10);
    const limit = parseInt(req.query.limit, 10);
    let count;
    Idea.count({
      category: { $eq: capitalize(category.trim()) }
    }, (err, isCount) => {
      count = isCount;
      Idea.find({})
        .where({ category: { $eq: capitalize(category.trim()) } })
        .skip(offset)
        .limit(limit)
        .exec()
        .then(ideas => res.status(200).send({
          ideas,
          pageInfo: pagination(count, limit, offset)
        }));
    });
  }

  /**
   * Routes: POST: /api/v1/users/ideas/search?offset=A?limit=B
   * @description This search for ideas base on category
   * @param {any} req user request object
   * @param {any} res server response
   * @return {void}
   * @memberOf IdeaController
   */
  static searchIdeas(req, res) {
    if (!req.body.searchTerm) {
      res.status(400).send({
        success: false,
        error: 'Please add filter term'
      });
    }
    const offset = parseInt(req.query.offset, 10);
    const limit = parseInt(req.query.limit, 10);
    let count;
    Idea.count({
      $text: { $search: req.body.searchTerm.trim() },
      description: capitalize(req.body.searchTerm.trim())
    }, (err, isCount) => {
      count = isCount;
      Idea.find({
        $text: { $search: req.body.searchTerm.trim() },
        description: capitalize(req.body.searchTerm)
      })
        .skip(offset)
        .limit(limit)
        .exec()
        .then(ideas => res.status(200).send({
          ideas,
          pageInfo: pagination(count, limit, offset),
        }));
    });
  }
}

export default IdeaController;
