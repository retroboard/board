import { times } from 'ramda';
const OrbitDB = require('orbit-db');

jest.mock('orbit-db', () => jest.fn());
jest.mock('uuid/v4');

describe('columnsRepositiry', () => {
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
    it('adds new column', async () => {
      const column = { id: 'id' };
      const columnsService = require('../../services/columnsService').default;
      const repo = await columnsService();
      repo.add(column);
      expect(db.put).toHaveBeenCalledWith(column);
    });

    it('adds ID to column if not provided', async () => {
      const column = {};
      const columnsService = require('../../services/columnsService').default;
      require('uuid/v4').mockReturnValue('uuid');
      const repo = await columnsService();
      repo.add(column);
      expect(db.put).toHaveBeenCalledWith({ _id: 'uuid' });
    });

    it('propagates new column to subscribers', async (done) => {
      const column = jest.fn();
      const columnsService = require('../../services/columnsService').default;
      const repo = await columnsService();
      const subscriber = jest.fn();
      repo.columns.subscribe(subscriber);
      await repo.add(column);

      setImmediate(() => {
        expect(subscriber).toHaveBeenCalledTimes(2);
        done();
      });
    });
  });

  describe('#columns()', () => {
    it('returns all columns from the db', async done => {
      const expectedcolumns = [{ text: 'Text', date: Date.now() }];
      db.query.mockReturnValue(expectedcolumns);
      const columnsService = require('../../services/columnsService').default;
      const repo = await columnsService();
      repo.columns.subscribe(columns => {
        expect(columns).toEqual(expectedcolumns);
        done();
      });
    });

    it('propagates columns to subscibers when db is replicated', async done => {
      const firstExpectedcolumns = [1];
      const secondExpectedcolumns = [1, 2];
      replicationTimes = 4;

      db.query
        .mockReturnValueOnce(firstExpectedcolumns)
        .mockReturnValueOnce(secondExpectedcolumns);
      const columnsService = require('../../services/columnsService').default;
      const subscriber = jest.fn();
      const repo = await columnsService();
      repo.columns.subscribe(subscriber);

      setImmediate(() => {
        expect(subscriber).toHaveBeenCalledTimes(5);
        expect(subscriber).toHaveBeenCalledWith(firstExpectedcolumns);
        expect(subscriber).toHaveBeenCalledWith(secondExpectedcolumns);
        done();
      });
    });
  });

  describe('#delete()', () => {
    it('remove card', async () => {
      const column = { _id: 'id' };
      const columnsService = require('../../services/columnsService').default;
      const repo = await columnsService();
      repo.remove(column);
      expect(db.del).toHaveBeenCalledWith('id');
    });
  });
});
