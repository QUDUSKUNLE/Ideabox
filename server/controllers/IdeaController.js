import capitalize from 'capitalize';
import Idea from '../models/Idea';

/**
 * @class IdeaController
 */
class IdeaController {
  /**
   * Routes: POST: /api/v1/users/ideas/:id
   * @param {any} req
   * @param {any} res
   * @return {void}
   * @memberOf IdeaController
   */
  static createIdea(req, res) {
    if ((req.body.title === undefined) ||
      (req.body.description === undefined) ||
      (req.body.category === undefined) ||
      (req.body.access === undefined)) {
      return res.status(400).send({
        success: false,
        error: 'Either title, description, category or access is undefined'
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
            message: 'Title must be unique'
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
   * @param {any} req
   * @param {any} res
   * @return {void}
   * @memberOf IdeaController
   */
  static editIdea(req, res) {
    if ((req.body.title === undefined) ||
      (req.body.description === undefined) ||
      (req.body.category === undefined) ||
      (req.body.access === undefined)) {
      return res.status(400).send({
        success: false,
        error: 'Either title, description, category or access is undefined'
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
   * @param {any} req
   * @param {any} res
   * @return {void}
   * @memberOf IdeaController
   */
  static deleteIdea(req, res) {
    const { ideaId } = req.params;
    // Find byId and delete
    Idea.findByIdAndRemove(ideaId, (err) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Idea deleted successfully' });
    });
  }

  /**
   * Routes: GET: /api/v1/users/ideas
   * @description This search for ideas base on category
   * @param {any} req
   * @param {any} res
   * @return {void}
   * @memberOf IdeaController
   */
  static searchIdea(req, res) {
    if (req.query.category === undefined) {
      return res.status(400).send({
        success: false,
        error: 'Invalid request'
      });
    }
    // Implement Filter
    if (req.query.category) {
      const { category } = req.query;
      // Filter by category
      Idea.find({}).where({ category: { $eq: capitalize(category.trim()) } })
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
    // Search
    if (req.query.search) {
      const { search } = req.query;
      // Search by name
      Idea.find({}).where({ category: { $eq: capitalize(search.trim()) } })
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
  }
}

export default IdeaController;
