'use strict';

const express = require('express');
const app = express();
app.use(express.json());

// Your code starts here. Placeholders for .get and .post are provided for
//  your convenience.
var candidates = [];

app.post("/candidates", function (req, res) {
    if ((req.body.id || "").length === 0 || (req.body.name || "").length === 0) {
      return res
        .status(400)
        .json({ message: "Candidate id, and name are required fields." });
    }
    if ((req.body.skills || []).length === 0) {
      req.body.skills = [];
    }
    if (candidates.map((x) => x.id).includes(req.body.id)) {
      return res.status(400).json({ message: "This candidate already exists." });
    }
    candidates.push(req.body);
    return res.status(201).json({});
  });


  app.get("/candidates/search", function (req, res) {
    if (((req.query || {}).skills || "").length === 0) {
      return res
        .status(404)
        .json({ message: "Comma seperated skills are required for searching." });
    }
    const skills = req.query.skills.split(",");
    let sortedCandidates = 
      candidates
        .map((x) => ({
          candidate: x,
          matches: intersection(skills, x.skills).length,
        }))
        .sort((a, b) =>
          a.matches < b.matches ? 1 : b.matches < a.matches ? -1 : 0
        ).filter(x => x.matches > 0) || [];
    let deservingCandidate = {};
    if (sortedCandidates.length > 0) {
      deservingCandidate = sortedCandidates[0].candidate;
    }
    else{
        return res.status(404).message("Bad Request");
    }
    return res.status(200).json(deservingCandidate);
  });

  function intersection (arr1, arr2){
   return arr1.filter(value => arr2.includes(value))
}

app.get('/candidates/all', (req, res) =>{
  res.send(candidates);
})

  
  app.listen(process.env.HTTP_PORT || 3000);