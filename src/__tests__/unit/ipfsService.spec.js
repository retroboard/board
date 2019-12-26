function IpfsMock() {
  this.once = (event, cb) => {
    cb();
  };
}

const makeService = () => require('../../services/ipfsService').default;

describe('#getInstance()', () => {
  it('resolves to an IPFS node instance when its ready', async () => {
    window.Ipfs = IpfsMock;
    const ipfsService = makeService();
    const ipfs = await ipfsService.getInstance();
    expect(ipfs).toBeInstanceOf(IpfsMock);
  });
});
