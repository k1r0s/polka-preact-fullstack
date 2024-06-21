import sinon from "sinon";
import assert from "assert";
import suid from "short-uuid";
import rewire from "rewire";
const subject = rewire("../../src/redis.js");

sinon.stub(suid, "generate").callsFake(() => "random-id");

function mockClient () {
  const clientStub = {};
  clientStub.disconnect = sinon.stub();
  clientStub.set = sinon.stub();
  clientStub.del = sinon.stub();
  clientStub.get = sinon.stub();
  clientStub.RPUSH = sinon.stub();
  clientStub.LREM = sinon.stub();
  clientStub.LRANGE = sinon.stub();
  clientStub.reset = subject.__set__("getClient", () => Promise.resolve(clientStub));
  return clientStub;
}

describe("redis client", () => {
  let client;
  beforeEach(() => client = mockClient())
  afterEach(() => client.reset());

  it(`
    create: should both register a PK into a redis collection
    and set a property as a plain key
  `, async () => {

      client.RPUSH.resolves();
      client.set.resolves();
      client.disconnect.resolves();

      const result = await subject.create("myCollection", { val: 1 });

      assert(client.RPUSH.calledWith("myCollection", "random-id"));
      assert(client.set.calledWith("myCollection-random-id", '{"val":1,"uid":"random-id"}'));
      assert(client.disconnect.called);
      assert("val" in result);
      assert("uid" in result);
    }
  );

  it(`
    update: should only update the collection based on the received uid
  `, async () => {

      client.set.resolves();
      client.disconnect.resolves();

      const result = await subject.update("myCollection", "random-id", { some: 1, val: 1, uid: "random-id" });

      assert(client.set.calledWith("myCollection-random-id", '{"some":1,"val":1,"uid":"random-id"}'));
      assert(client.disconnect.called);
      assert("some" in result);
      assert("val" in result);
      assert("uid" in result);
    }
  )

  it(`
    remove: should remove the uid from the collection and delete plain key
  `, async () => {

      client.del.resolves();
      client.LREM.resolves();
      client.disconnect.resolves();

      await subject.remove("myCollection", "random-id");

      assert(client.del.calledWith("myCollection-random-id"));
      assert(client.LREM.calledWith("myCollection", 0, "random-id"));
      assert(client.disconnect.called);
    }
  )

  it(`
    read(): should retrieve all elements within the collection
  `, async () => {

      client.LRANGE.resolves(["random-1", "random-2"]);
      client.disconnect.resolves();

      const result = await subject.read("myCollection");

      assert(client.LRANGE.calledWith("myCollection", 0, -1));
      assert(client.disconnect.called);
      assert(result.length === 2);
      assert(result.includes("random-1"));
      assert(result.includes("random-2"));
    }
  )

  it(`
    read(1): should retrieve a single element having the key
  `, async () => {

      client.get.resolves('{"val":1,"uid":"random-id"}');
      client.disconnect.resolves();

      const result = await subject.read("myCollection", "random-id");

      assert(client.get.calledWith("myCollection-random-id"));
      assert(client.disconnect.called);
      assert("val" in result);
      assert("uid" in result);
    }
  )
});
