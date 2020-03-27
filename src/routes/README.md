## Route explanation using an example

    router.get('/list', checkAuth, userController.list)

    Using the router given by express we simply declare with HTTP verb we
    want to use (in this case we're using GET) and after that we pass 3
    arguments: the route itself as a string, a middleware to check if the
    requester is authenticated and the verb inside the controller which's
    going to handle the action requested, in this case to list all users.
