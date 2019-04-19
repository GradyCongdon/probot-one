module.exports = (app) => {
  // Your code here
  app.log('prod!! The app was loaded!');
  
  
  app.on('push', async context => {
    console.log(context);
    const params = {
      owner: context.owner,
      repo: context.repo,
      head_sha: context.head,
      name: 'Viewed by probot',
    }
    return context.github.checks.create(params)
  });

  // example of probot responding 'Hello World' to a new issue being opened
  app.on('issues.opened', async context => {
    // `context` extracts information from the event, which can be passed to
    // GitHub API calls. This will return:
    //   {owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World!}
    const params = context.issue({body: 'Hello World!'})

    // Post a comment on the issue
    return context.github.issues.createComment(params)
  });

  app.on('pull_request', async context => {
    console.log(context);
    const params = {
      owner: context.owner,
      repo: context.repo,
      pullNumber: context.pullNumber,
      event: 'APPROVE',
    }
    return context.github.pull.createReview(params)
  });
  
  
    app.on('pull_request.opened', async context => {
    app.log('PR');

    console.log('PR OPENED');
    console.log(context);
    const params = {
      owner: context.owner,
      repo: context.repo,
      pullNumber: context.pullNumber,
      event: 'APPROVE',
    }
    return context.github.pull.createReview(params)
  });
  


}
