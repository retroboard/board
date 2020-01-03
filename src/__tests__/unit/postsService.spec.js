import { times } from 'ramda';
const OrbitDB = require('orbit-db');

jest.mock('orbit-db', () => jest.fn());
jest.mock('uuid/v4');

describe('postsRepositiry', () => {
  let db;
  let replicationTimes;

  beforeEach(() => {
    replicationTimes = 0;
    db = {
      query: jest.fn(() => []),
      load: jest.fn(),
      put: jest.fn(),
      del: jest.fn(),
      events: {
        on: (event, cb) => {
          if (event === 'replicated') {
            times(cb, replicationTimes);
          }
        },
      },
    };

    OrbitDB.mockImplementation(() => ({
      docs: jest.fn().mockResolvedValue(db),
    }));

  });

  describe('#add()', () => {
    it('adds new post', async () => {
      const post = { id: 'id' };
      const postsService = require('../../services/postsService').default;
      const repo = await postsService();
      repo.add(post);
      expect(db.put).toHaveBeenCalledWith(post);
    });

    it('adds ID to post if not provided', async () => {
      const post = {};
      const postsService = require('../../services/postsService').default;
      require('uuid/v4').mockReturnValue('uuid');
      const repo = await postsService();
      repo.add(post);
      expect(db.put).toHaveBeenCalledWith({ _id: 'uuid' });
    });

    it('propagates new post to subscribers', async (done) => {
      const post = jest.fn();
      const postsService = require('../../services/postsService').default;
      const repo = await postsService();
      const subscriber = jest.fn();
      repo.posts.subscribe(subscriber);
      await repo.add(post);

      setImmediate(() => {
        expect(subscriber).toHaveBeenCalledTimes(2);
        done();
      });
    });
  });

  describe('#posts()', () => {
    it('returns all posts from the db', async done => {
      const expectedPosts = [{ text: 'Text', date: Date.now() }];
      db.query.mockReturnValue(expectedPosts);
      const postsService = require('../../services/postsService').default;
      const repo = await postsService();
      repo.posts.subscribe(posts => {
        expect(posts).toEqual(expectedPosts);
        done();
      });
    });

    it('propagates posts to subscibers when db is replicated', async done => {
      const firstExpectedPosts = [1];
      const secondExpectedPosts = [1, 2];
      replicationTimes = 4;

      db.query
        .mockResolvedValueOnce(Promise.resolve(firstExpectedPosts))
        .mockResolvedValueOnce(Promise.resolve(secondExpectedPosts));
      const postsService = require('../../services/postsService').default;
      const subscriber = jest.fn();
      const repo = await postsService();
      repo.posts.subscribe(subscriber);

      setImmediate(() => {
        expect(subscriber).toHaveBeenCalledTimes(5);
        expect(subscriber).toHaveBeenCalledWith(firstExpectedPosts);
        expect(subscriber).toHaveBeenCalledWith(secondExpectedPosts);
        done();
      });
    });
  });

  describe('#delete()', () => {
    it('remove card', async () => {
      const post = { _id: 'id' };
      const postsService = require('../../services/postsService').default;
      const repo = await postsService();
      repo.remove(post);
      expect(db.del).toHaveBeenCalledWith('id');
    });
  });
});
