const MessageRequest = require('../models/MessageRequest');

// exports.sendRequest = async (req, res) => {
//   const { receiverId } = req.body;
//   const request = new MessageRequest({ sender: req.userId, receiver: receiverId });
//   await request.save();
//   res.status(201).json(request);
// };
exports.sendRequest = async (req, res) => {
  const { receiverId } = req.body;

  try {
    // Check if a request already exists between sender and receiver
    const existingRequest = await MessageRequest.findOne({
      sender: req.userId,
      receiver: receiverId
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent." });
    }

    // If no existing request, create a new one
    const request = new MessageRequest({ sender: req.userId, receiver: receiverId });
    await request.save();
    res.status(201).json(request);

  } catch (error) {
    console.error("Error sending request:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getRequests = async (req, res) => {
  try{
    const requests = await MessageRequest.find({ receiver: req.userId, status: 'pending' }).populate('sender', 'name');
    res.status(200).json(requests);
  }catch(error) {
    res.status(500).json({ error: "Server error" });
    
  }
 
};
exports.getStatus = async (req, res) => {
  try {
    const currentUserId = req.userId; // Current user ID from authMiddleware

   const status = await MessageRequest.find({
    sender:currentUserId});
    res.status(200).json(status);

  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
};

exports.respondToRequest = async (req, res) => {
  const { requestId, status } = req.body;
  const request = await MessageRequest.findById(requestId);
  if (request.receiver.toString() === req.userId) {
    request.status = status;
    await request.save();
    res.status(200).json(request);
  } else {
    res.status(403).send("Unauthorized");
  }
};
exports.getAcceptedRequests = async (req, res) => { 
  try {
    const userId = req.userId; // Get the current logged-in user's ID from the token

    const requests = await MessageRequest.find({ 
      sender: userId,   // Get requests where the current user is the sender
      status: 'accepted' // Only get requests that have been accepted
    }).populate('receiver', 'name'); // Populate the receiver's name

    res.json(requests); // Return the accepted requests to the client
  } catch (error) {
    console.error("Error fetching accepted message requests:", error);
    res.status(500).json({ message: "Server error" });
  }
};

