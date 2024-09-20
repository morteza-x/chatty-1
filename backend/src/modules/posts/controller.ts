import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import Vote from "../../models/Vote";
import Post from "../../models/Post";
import Notification from "../../models/Notification";
import moment from "moment";
import { TCreatePost, TGetPost, TGetPosts, TVote } from "../../types/apiTs";

export const postsController = {
  // all posts
  async gets(req: Request, res: Response) {
    try{
      //@ts-ignore
      const {limit=5, page=1}:TGetPosts = req.query;

      if (!limit || !page) return res.status(HttpStatusCode.BadRequest).json({
        msg: 'missing input!',
        success: false,
      })

      // calculate skip based on page and limit
      // -1 =: means skip 0 elements at page 1 
      //const skip = (page - 1) * limit;

      // fetch from 0 up to page 2 or what ever
      const totalLimit = page * limit; // 5 * 2 = 10

      // @ts-ignore
      //const user = req.user;

      const totalCount = await Post.countDocuments({});
      //const hasMore = totalCount > skip + limit;
      const hasMore = totalCount > totalLimit;

      const posts = await Post.find({})
        .populate('user')
        .populate({
          path: 'votes',
          model: 'Vote'
        })
        //.sort({numVotes: -1})
        .skip(0)
        .limit(totalLimit)

      return res.status(HttpStatusCode.Created).json({
        msg: 'posts!',
        results: posts,
        pages: Math.ceil(totalCount / limit),
        hasMore: hasMore,
      });
      
    }catch(err:any) {
      return res.status(400).json({
        msg: 'posts failed!',
        error: err?.message || err,
      });
    }
  },

  // a user's posts
  async getUserPosts(req: Request, res: Response) {
    try{
      //@ts-ignore
      const {limit=5, page=1}:TGetPosts = req.query;
      //@ts-ignore
      const user = req.user;

      if (!limit || !page || !user) return res.status(HttpStatusCode.BadRequest).json({
        msg: 'missing input!',
        success: false,
      })

      // fetch from 0 up to page 2 or what ever
      const totalLimit = page * limit; // 5 * 2 = 10

      const totalCount = await Post.countDocuments({});
      //const hasMore = totalCount > skip + limit;
      const hasMore = totalCount > totalLimit;

      const posts = await Post.find({user: user._id})
        .populate('user')
        .populate({
          path: 'votes',
          model: 'Vote'
        })
        //.sort({numVotes: -1})
        .skip(0)
        .limit(totalLimit)
        .sort({createdAt: -1})

      return res.status(HttpStatusCode.Created).json({
        msg: 'user posts!',
        results: posts,
        pages: Math.ceil(totalCount / limit),
        hasMore: hasMore,
      });
      
    }catch(err:any) {
      return res.status(400).json({
        msg: 'user posts failed!',
        error: err?.message || err,
      });
    }
  },

  async get(req: Request, res: Response) {
    try{
      //@ts-ignore
      //const user = req.user;
      const input:TGetPost = {
        postId: req.params.id,
      }; 

      if (!input.postId) return res.status(HttpStatusCode.BadRequest).json({
        success: false,
        msg: 'missing input!'
      })

      const postM = await Post.findOne({_id: input.postId})
        .populate('user')
        .populate({
          path: 'votes',
          model: 'Vote'
        });

      // also: votes
      const votes = await Vote.find({})

      return res.status(HttpStatusCode.Created).json({
        msg: 'posts!',
        results: postM,
      });
      
    }catch(err:any) {
      return res.status(400).json({
        msg: 'posts failed!',
        error: err?.message || err,
      });
    }
  },

  // POST: /posts
  async create(req: Request, res: Response) {
    try{

      // @ts-ignore
      const user = req.user;

      const input: TCreatePost = {
        text: req.body.text,
        file: req.file,
      };
      console.log(input);
      if (!input.text || !input.file) return res.status(HttpStatusCode.BadRequest).json({
        success: false,
        msg: 'missing input!'
      })

      const newPost = await Post.create({
        user,
        text: input.text,
        //@ts-ignore
        image: input.file.location,
        votes: [],
      });

      return res.status(HttpStatusCode.Created).json({
        msg: 'create!',
        post: newPost,
      });
      
    }catch(err:any) {
      return res.status(400).json({
        msg: 'create failed!',
        error: err?.message || err,
      });
    }
  },

  // POST: /posts/vote
  async vote(req: Request, res: Response) {
    try{

      const input:TVote = {
        postId: req.body.postId,
        vote: req.body.vote,
      }
      const {vote, postId} = input;
      
      //@ts-ignore
      const user = req.user;

      if (!vote || !postId) return res.status(HttpStatusCode.BadRequest).json({
        success: true,
        msg: 'missing input!',
      })

      // fetch post=================
      const post = await Post.findOne({
        _id: postId,  
      });

      if (!post) return res.status(HttpStatusCode.BadRequest).json({
        msg: 'no post!',
        success: false,
      });
      //===========================fetch post

      // find the vote by id
      const oldVote = await Vote.findOne({post: postId, user: user._id});

      if (oldVote) {
        // update old vote
        oldVote.vote = Number(vote);
        const updated = await oldVote.save();

        const message = `Your post was ${vote === '1' ? 'up voted' : 'down voted'}! on: ${moment(new Date()).format('MMM DD YYYY')}`;
        //@ts-ignore
        createNotification(user._id, post.user, message);

        return res.status(HttpStatusCode.Created).json({
          msg: 'vote!',
          success: true,
          vote: updated,
        });
      } else {
        // make a new vote
        // create a vote
        const voteObj = await Vote.create({
          user: user?._id,
          post: postId,
          vote: Number(vote),
        });

        // update number of vote on post
        //@ts-ignore
        post.votes.push(voteObj);
        const updated = await post.save();

        const message = `Your post was ${vote === '1' ? 'up voted' : 'down voted'}! on: ${moment(new Date()).format('MMM DD YYYY')}`;
        //@ts-ignore
        createNotification(user._id, post.user, message);

        return res.status(HttpStatusCode.Created).json({
          msg: 'vote!',
          success: true,
          vote: voteObj,
          post: updated,
        });
      }
    }catch(err:any) {
      return res.status(400).json({
        msg: 'vote failed!',
        error: err?.message || err,
      });
    }
  },
}

// Function: create notification
async function createNotification(
  sender:any,
  receiver:any,
  message: string,
) {
  const notification = await Notification.create({
    sender,
    receiver,
    message,
    isRead: false,
  });
  return notification;
}