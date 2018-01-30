export default {
  signUp: {
    data: {
      message: 'Sign up successful',
      success: true,
      token: 'R6RUMTA6MzY6NTQyODd9.3SZX6RAWqky4Nuj7qtzh-fg7vMxIBggnS0E4tmmgfWk',
      userDetails: {
        email: 'quduskunle@gmail.com',
        username: 'Qudus Kunle',
        password: 'kuy81iyu892'
      }
    }
  },
  logIn: {
    data: {
      message: 'Sign in successful',
      success: true,
      token: 'R6RUMTA6MzY6NTQyODd9.3SZX6RAWqky4Nuj7qtzh-fg7vMxIBggnS0E4tmmgfWk',
      userDetails: {
        email: 'quduskunle@gmail.com',
        username: 'Qudus Kunle',
        password: 'kuy81iyu892'
      }
    }
  },
  resetPassword: {
    message: 'Reset password email sent successfully',
    success: true
  },
  createIdea: {
    message: 'Your Idea has been created successfully',
    success: true,
    createdIdea: {
      title: 'The beginning of the world',
      description: 'Nice Idea to implement',
      access: 'Public',
      category: 'Science & Technology'
    }
  },
  fetchPublicIdea: {
    message: 'Your Idea has been created successfully',
    success: true,
    createdIdea: {
      title: 'The beginning of the world',
      description: 'Nice Idea to implement',
      access: 'Public',
      category: 'Science & Technology'
    }
  },
  fetchIdeaByCategory: {
    message: 'Your Idea has been created successfully',
    success: true,
    createdIdea: {
      title: 'The beginning of the world',
      description: 'Nice Idea to implement',
      access: 'Public',
      category: 'Science & Technology'
    }
  },
  myIdeas: {
    data: {
      ideas: [
        {
          _id: '5a329d19ca28435384479141',
          title: 'New Idea of Lagos City Nigeria',
          description: '**Nice Idea Kunle** Can I have',
          __v: 0,
          createdAt: '2017-12-14T15:47:37.656Z',
          updatedAt: '2017-12-14T15:47:37.656Z',
          author: {
            id: '5a284ddbedc9b460093101af',
            name: 'Joke Adunni'
          },
          status: false,
          access: [
            'Public'
          ],
          category: [
            'Technology'
          ]
        },
        {
          _id: '5a329d19ca28435384479141',
          title: 'New Idea of Lagos City Nigeria',
          description: '**Nice Idea Kunle** Can I have',
          __v: 0,
          createdAt: '2017-12-14T15:47:37.656Z',
          updatedAt: '2017-12-14T15:47:37.656Z',
          author: {
            id: '5a284ddbedc9b460093101af',
            name: 'Joke Adunni'
          },
          status: false,
          access: [
            'Public'
          ],
          category: [
            'Technology'
          ]
        }
      ],
      pageInfo: {
        page: 1,
        pageCount: 1,
        pageSize: 5,
        count: 5
      }
    }
  },
  deleteIdea: {
    data: {
      success: true,
      message: 'Idea deleted successfully'
    }
  },
  updateIdea: {
    data: {
      success: true,
      message: 'Idea updated successfully',
      status: 'edited',
      updatedIdea: {
        title: 'The beginning of the world',
        description: 'Nice Idea to implement',
        access: 'Public',
        category: 'Science & Technology',
        status: 'edited'
      }
    }
  },
  searchIdea: {
    data: {
      ideas: [
        {
          _id: '5a329d19ca28435384479141',
          title: 'New Idea of Lagos City Nigeria',
          description: '**Nice Idea Kunle** Can I have',
          __v: 0,
          createdAt: '2017-12-14T15:47:37.656Z',
          updatedAt: '2017-12-14T15:47:37.656Z',
          author: {
            id: '5a284ddbedc9b460093101af',
            name: 'Joke Adunni'
          },
          status: false,
          access: [
            'Public'
          ],
          category: [
            'Technology'
          ]
        },
        {
          _id: '5a329d19ca28435384479141',
          title: 'New Idea of Lagos City Nigeria',
          description: '**Nice Idea Kunle** Can I have',
          __v: 0,
          createdAt: '2017-12-14T15:47:37.656Z',
          updatedAt: '2017-12-14T15:47:37.656Z',
          author: {
            id: '5a284ddbedc9b460093101af',
            name: 'Joke Adunni'
          },
          status: false,
          access: [
            'Public'
          ],
          category: [
            'Technology'
          ]
        }
      ],
      pageInfo: {
        page: 1,
        pageCount: 1,
        pageSize: 5,
        count: 5
      }
    }
  },
  updateProfile: {
    data: {
      user: {
        username: 'Qudus Kunle',
        email: 'kola@gmail.com'
      },
      message: 'Profile updated successfully',
      success: true
    }
  },
  fetchIdea: {
    data: {
      ideas: [
        {
          _id: '5a3238758e67dc4644a9d4ce',
          title: 'New Idea',
          description: '**Yes Nes Idea**',
          __v: 0,
          createdAt: '2017-12-14T08:38:13.674Z',
          updatedAt: '2017-12-14T08:38:13.674Z',
          author: {
            id: '5a284ddbedc9b460093101af',
            name: 'Joke Adunni'
          },
          status: false,
          access: [
            'Public'
          ],
          category: [
            'Technology'
          ]
        }
      ]
    }
  },
  createComment: {
    data: {
      success: true,
      message: 'Success',
      createdComment: {
        comment: 'Nice idea, keep it up'
      }
    }
  },
  fetchComment: {
    data: {
      comments: [
        {
          _id: '5a303966f3c6d0df89c72682',
          comment: 'Hello everyone!!!',
          __v: 0,
          idea: {
            id: '5a2237e61f7c9a0bad4e3206'
          },
          author: {
            id: '5a284ddbedc9b460093101af',
            name: 'Joke Adunni'
          },
          createdAt: '2017-12-12T20:17:42.302Z',
          updatedAt: '2017-12-12T20:17:42.302Z'
        }
      ]
    }
  },
  updatePassword: {
    data: {
      success: true,
      message: 'Password has been updated'
    }
  },

  createCommentResponse: {
    data: {
      success: true,
      message: 'Success',
      createdComment: {
        comment: 'Nice idea, keep it up'
      }
    }
  },
  fetchCommentResponse: {
    data: {
      comments: [
        {
          _id: '5a303966f3c6d0df89c72682',
          comment: 'Hello everyone!!!',
          __v: 0,
          idea: {
            id: '5a2237e61f7c9a0bad4e3206'
          },
          author: {
            id: '5a284ddbedc9b460093101af',
            name: 'Joke Adunni'
          },
          createdAt: '2017-12-12T20:17:42.302Z',
          updatedAt: '2017-12-12T20:17:42.302Z'
        }
      ]
    }
  },
  signUpResponse: {
    data: {
      message: 'Sign up successful',
      success: true,
      token: 'R6RUMTA6MzY6NTQyODd9.3SZX6RAWqky4Nuj7qtzh-fg7vMxIBggnS0E4tmmgfWk',
      userDetails: {
        email: 'quduskunle@gmail.com',
        username: 'Qudus Kunle',
        password: 'kuy81iyu892'
      }
    }
  },
  logInResponse: {
    data: {
      message: 'Sign in successful',
      success: true,
      token: 'R6RUMTA6MzY6NTQyODd9.3SZX6RAWqky4Nuj7qtzh-fg7vMxIBggnS0E4tmmgfWk',
      userDetails: {
        email: 'quduskunle@gmail.com',
        username: 'Qudus Kunle',
        password: 'kuy81iyu892'
      }
    }
  },
  resetPasswordResponse: {
    data: {
      message: 'Reset password email sent successfully',
      success: true
    }
  },
  createIdeaResponse: {
    data: {
      message: 'Your Idea has been created successfully',
      success: true,
      createdIdea: {
        title: 'The beginning of the world',
        description: 'Nice Idea to implement',
        access: 'Public',
        category: 'Science & Technology'
      }
    }
  },
  publicIdeasResponse: {
    data: {
      ideas: [
        {
          _id: '5a2237e61f7c9a0bad4e3206',
          title: 'Ok, morning here',
          description: 'This is to demonstrate how to bake cake for the young',
          __v: 0,
          createdAt: '2017-12-02T05:19:34.811Z',
          updatedAt: '2017-12-02T05:19:34.811Z',
          author: {
            id: '5a2085505d1e9a42bece8858',
            name: 'Quduskunle'
          },
          status: false,
          access: [
            'Public'
          ],
          category: [
            'Cosmetics'
          ]
        },
        {
          _id: '5a25599874dea07c3fffcdcb',
          title: 'Abdrushin',
          description: 'The Book of Grail',
          __v: 0,
          createdAt: '2017-12-04T14:20:08.632Z',
          updatedAt: '2017-12-04T14:20:08.632Z',
          author: {
            id: '5a25589374dea07c3fffcdca',
            name: 'Quduskunle'
          },
          status: false,
          access: [
            'Public'
          ],
          category: [
            'Religion'
          ]
        }
      ],
      pageInfo: {
        page: 1,
        pageCount: 4,
        pageSize: 6,
        count: 21
      }
    }
  },
  categoryIdeasResponse: {
    data: {
      ideas: [
        {
          _id: '5a3238758e67dc4644a9d4ce',
          title: 'New Idea',
          description: '**Yes Nes Idea**',
          __v: 0,
          createdAt: '2017-12-14T08:38:13.674Z',
          updatedAt: '2017-12-14T08:38:13.674Z',
          author: {
            id: '5a284ddbedc9b460093101af',
            name: 'Joke Adunni'
          },
          status: false,
          access: [
            'Public'
          ],
          category: [
            'Technology'
          ]
        },
        {
          _id: '5a329d19ca28435384479141',
          title: 'New Idea of Lagos City Nigeria',
          description: '**Nice Idea Kunle** Can I have',
          __v: 0,
          createdAt: '2017-12-14T15:47:37.656Z',
          updatedAt: '2017-12-14T15:47:37.656Z',
          author: {
            id: '5a284ddbedc9b460093101af',
            name: 'Joke Adunni'
          },
          status: false,
          access: [
            'Public'
          ],
          category: [
            'Technology'
          ]
        }
      ],
      pageInfo: {
        page: 1,
        pageCount: 1,
        pageSize: 5,
        count: 5
      }
    }
  },
  myIdeasResponse: {
    data: {
      ideas: [
        {
          _id: '5a329d19ca28435384479141',
          title: 'New Idea of Lagos City Nigeria',
          description: '**Nice Idea Kunle** Can I have',
          __v: 0,
          createdAt: '2017-12-14T15:47:37.656Z',
          updatedAt: '2017-12-14T15:47:37.656Z',
          author: {
            id: '5a284ddbedc9b460093101af',
            name: 'Joke Adunni'
          },
          status: false,
          access: [
            'Public'
          ],
          category: [
            'Technology'
          ]
        },
        {
          _id: '5a329d19ca28435384479141',
          title: 'New Idea of Lagos City Nigeria',
          description: '**Nice Idea Kunle** Can I have',
          __v: 0,
          createdAt: '2017-12-14T15:47:37.656Z',
          updatedAt: '2017-12-14T15:47:37.656Z',
          author: {
            id: '5a284ddbedc9b460093101af',
            name: 'Joke Adunni'
          },
          status: false,
          access: [
            'Public'
          ],
          category: [
            'Technology'
          ]
        }
      ],
      pageInfo: {
        page: 1,
        pageCount: 1,
        pageSize: 5,
        count: 5
      }
    }
  },
  deleteIdeaResponse: {
    data: {
      success: true,
      message: 'Idea deleted successfully'
    }
  },
  updateIdeaResponse: {
    data: {
      success: true,
      message: 'Idea updated successfully',
      status: 'edited',
      updatedIdea: {
        title: 'The beginning of the world',
        description: 'Nice Idea to implement',
        access: 'Public',
        category: 'Science & Technology',
        status: 'edited'
      }
    }
  },
  searchIdeaResponse: {
    data: {
      ideas: [
        {
          _id: '5a329d19ca28435384479141',
          title: 'New Idea of Lagos City Nigeria',
          description: '**Nice Idea Kunle** Can I have',
          __v: 0,
          createdAt: '2017-12-14T15:47:37.656Z',
          updatedAt: '2017-12-14T15:47:37.656Z',
          author: {
            id: '5a284ddbedc9b460093101af',
            name: 'Joke Adunni'
          },
          status: false,
          access: [
            'Public'
          ],
          category: [
            'Technology'
          ]
        },
        {
          _id: '5a329d19ca28435384479141',
          title: 'New Idea of Lagos City Nigeria',
          description: '**Nice Idea Kunle** Can I have',
          __v: 0,
          createdAt: '2017-12-14T15:47:37.656Z',
          updatedAt: '2017-12-14T15:47:37.656Z',
          author: {
            id: '5a284ddbedc9b460093101af',
            name: 'Joke Adunni'
          },
          status: false,
          access: [
            'Public'
          ],
          category: [
            'Technology'
          ]
        }
      ],
      pageInfo: {
        page: 1,
        pageCount: 1,
        pageSize: 5,
        count: 5
      }
    }
  },
  updateProfileResponse: {
    data: {
      user: {
        username: 'Qudus Kunle',
        email: 'kola@gmail.com'
      },
      message: 'Profile updated successfully',
      success: true
    }
  },
  fetchIdeaResponse: {
    data: {
      ideas: [
        {
          _id: '5a3238758e67dc4644a9d4ce',
          title: 'New Idea',
          description: '**Yes Nes Idea**',
          __v: 0,
          createdAt: '2017-12-14T08:38:13.674Z',
          updatedAt: '2017-12-14T08:38:13.674Z',
          author: {
            id: '5a284ddbedc9b460093101af',
            name: 'Joke Adunni'
          },
          status: false,
          access: [
            'Public'
          ],
          category: [
            'Technology'
          ]
        }
      ],
      pageInfo: {
        page: 1,
        pageCount: 1,
        pageSize: 5,
        count: 5
      }
    }
  },
  updatePasswordResponse: {
    data: {
      success: true,
      message: 'Password has been updated'
    }
  }
};
