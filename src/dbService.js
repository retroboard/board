import { Subject } from 'rxjs/Subject';
import OrbitDB from 'orbit-db';
import uuid from 'uuid/v4';

const node = new window.Ipfs({
  EXPERIMENTAL: {
    pubsub: true,
  },
  config: {
    Addresses: {
      Swarm: [
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
      ],
    },
  },
});

const nodeReady = new Promise(resolve => {
  node.once('ready', resolve);
});

const getInstance = async hash => {
  await nodeReady;
  const orbitdb = new OrbitDB(node);

  const posts = new Subject();

  const access = {
    write: ['*'], // Give write access to everyone
  };

  const db = await orbitdb.docs(hash, access);

  const publishPosts = async () => {
    await db.load();
    posts.next(await all());
  };

  db.events.on('replicated', () => {
    publishPosts();
  });

  const all = async () => {
    await db.load();
    return db.query(doc => doc);
  };

  const add = async post => {
    const _id = post._id || uuid();
    await db.put({ ...post, ...{ _id } });
    publishPosts();
  };

  publishPosts();

  return {
    add,
    all,
    posts,
  };
};

const createInstance = async () => {
  return uuid();
};

export default {
  createInstance,
  getInstance,
};
