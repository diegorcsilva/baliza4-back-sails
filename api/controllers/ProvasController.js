/**
 * ProvasController
 *
 * @description :: Server-side logic for managing provas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  todos: function (req, res) {

    Provas.find().populate('atletas').exec(function(err, values) {
      return res.send(values)
    })

  },

  balizamento: function (req, res) {

    if (!req.param('id')) {
      res.status(400);
      res.view('404', {data: 'É necessária a especificação da prova!'});
    }

    Provas.findById(req.param('id')).populate('atletas', {sort: 'tempo DESC'}).exec((err, provas) => {
      return res.send(BalizamentoService.balizar(provas[0], 5))
    })

  },

  socket: function (req, res) {

    if (!req.isSocket) {
      return res.badRequest();
    }

    // Have the socket which made the request join the "funSockets" room.
    sails.sockets.join(req, 'funSockets');

    // Broadcast a notification to all the sockets who have joined
    // the "funSockets" room, excluding our newly added socket:
    sails.sockets.broadcast('funSockets', 'hello', { howdy: 'hi there!'}, req);

    // ^^^
    // At this point, we've blasted out a socket message to all sockets who have
    // joined the "funSockets" room.  But that doesn't necessarily mean they
    // are _listening_.  In other words, to actually handle the socket message,
    // connected sockets need to be listening for this particular event (in this
    // case, we broadcasted our message with an event name of "hello").  The
    // client-side you'd need to write looks like this:
    //
    // io.socket.on('hello', function (broadcastedData){
    //   console.log(data.howdy);
    //   // => 'hi there!'
    // }
    //

    // Now that we've broadcasted our socket message, we still have to continue on
    // with any other logic we need to take care of in our action, and then send a
    // response.  In this case, we're just about wrapped up, so we'll continue on

    // Respond to the request with a 200 OK.
    // The data returned here is what we received back on the client as `data` in:
    // `io.socket.get('/say/hello', function gotResponse(data, jwRes) { /* ... */ });`
    return res.json({
      anyData: 'we want to send back'
    });

  }

};

