import Rx from 'rxjs';
import OrbitDB from 'orbit-db';
import uuid from 'uuid/v4';

const ACCESS_TO_EVERYONE = '*';

export default async (hash, node) => {
  const orbitdb = new OrbitDB(node);

  const access = {
    write: [ACCESS_TO_EVERYONE],
  };

  const db = await orbitdb.docs(hash, access);

  const all = async () => {
    await db.load();
    const columns = db.query(doc => doc);
    columns.sort((column1, column2) => (column1.date - column2.date));
    return columns;
  };

  const columns = new Rx.BehaviorSubject();
  columns.next(await all());

  db.events.on('replicated', async () => {
    columns.next(await all());
  });

  const add = async column => {
    const _id = column._id || uuid();
    const data = await db.put({ ...column, ...{ _id } });
    columns.next(await all());
    return data;
  };

  const remove = async column => {
    const _id = column._id;
    const data = await db.del(_id);
    columns.next(await all());
    return data;
  };

  return {
    columns,
    add,
    remove,
  };
};
