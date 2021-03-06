var events = require('./database').collection('events');
// var JSONStream = require('JSONStream');

// module.exports = function(uuid, callback) {
module.exports = function(uuid) {

  var newTimestamp = new Date().getTime();

  // events.find({
  //   $or: [{fromUuid: uuid}, {uuid:uuid}, { devices: {$in: [uuid, "all", "*"]}}],
  //   timestamp: { $gt : newTimestamp }
  // }).pipe(JSONStream.stringify()).pipe(process.stdout);

  // res.writeHead(200, {"Content-Type":"application/json"});
  // res.header('Content-Type', 'application/json');

  var cursor = events.find({
    $or: [{fromUuid: uuid}, {uuid:uuid}, { devices: {$in: [uuid, "all", "*"]}}],
    timestamp: { $gt : newTimestamp }
  }, {}, {tailable:true, timeout:false});

  // // since all cursors are streams we can just listen for data
  // cursor.on('data', function(doc) {
  //     console.log('new document', doc);
  //     // callback(doc);
  //     // res.write({"events": doc});
  //     // return cursor.pipe(JSONStream.stringify());
  //     // return JSON.stringify(data);
  // });

  return cursor;

};