var chai = require('chai'),
  expect = chai.expect,
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  rewire = require('rewire');

chai.use(sinonChai);

describe('BitbucketPipelines service', function () {
  context('Simplified build information', function () {

    var bitbucket, requestStub;

    beforeEach(function () {
      requestStub = {
        makeRequest: sinon.spy()
      };
      var bitbucketModule = rewire('../../app/services/BitbucketPipelines');
      bitbucketModule.__set__('request', requestStub);

      bitbucket = new bitbucketModule();

      var configuration = {
        teamname: "MyTeam",
        username: "Me",
        slug: "MySlug"
      };
      bitbucket.configure(configuration);
    });

    it('should not call error callback function when arguments are correct', function () {
      errorCallback = sinon.spy();
      bitbucket.check(errorCallback);
      expect(errorCallback).to.have.not.been.called;
    });


    xit('should include the creator name when present', function () {
      errorCallback = sinon.spy();
      bitbucket.check(errorCallback);
      expect(errorCallback).to.have.not.been.called;
      expect(requestStub.makeRequest).to.have.been.calledWithExactly({

          headers: { Authorization: "Basic TWU6dW5kZWZpbmVk" },
          url: "https://api.bitbucket.org/2.0/repositories/MyTeam/MySlug/pipelines/?sort=-created_on&pagelen=1"

      });
    });
  });
});
