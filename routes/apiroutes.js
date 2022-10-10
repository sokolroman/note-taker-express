const uuid = require("../helpers/uuid")
const utils = require("../helpers/fsUtils")
const router = require("express").Router() 

router.get ('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
  
    utils.readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });


// POST Route for submitting feedback
router.post('/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to submit notes`);
  
    // Destructuring assignment for the items in req.body
    const { title, text} = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text, 
        id: uuid()
      };
  
      utils.readAndAppend(newNote, './db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting note');
    }
  });
  
  router.delete('/notes/:id',(req, res) => {
    console.info(`${req.method} request received to delete notes`);
    utils.readAndDelete(req.params.id, './db/db.json');
    res.json("success")
})
  
module.exports = router