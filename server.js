const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/newdatabasedb", { useNewUrlParser: true, useFindAndModify: false },() => {
console.log("Mongodb connected")
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/exercise.html"))
}) 

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/stats.html"))
}) 

// app.get("/api/exercise/id", (req, res) => {
//   db.Workout.findById(req.params.id)
//     .then(dbWorkout => {
//       console.log("Find exercises in a workout",dbWorkout)
//       res.json(dbWorkout)
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      console.log("All workouts",dbWorkout)
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.put("/api/workouts/:id", (req, res) => {
  console.log(req.params.id,req.body)
  db.Workout.update(
    {_id:req.params.id}, 
    {$push:{exercises:req.body}})
    // .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
    .then(dbWorkout => {
      console.log("Update Array",dbWorkout)
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
    .then(dbWorkout => {
        console.log(dbWorkout);
        res.json(dbWorkout)
      })
      .catch(({ message }) => {
        console.log(message);
      });
     
  });

app.get("/api/workouts/range", (req, res) => {
  console.log(res)
  // db.Workout.find({$query:{},$orderby:{day:-1}})
  db.Workout.find({})
    .limit(20)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
