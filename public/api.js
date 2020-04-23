const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
      console.log(res.json())
      const json = await res.json(); 
      return json;
    }
    catch (err) {
      console.log(err)
    }
  },

  async addExercise(data) {
    const id = location.search.split("=")[1];
    console.log("ID",id)
    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  async createWorkout(data = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    return json;
  },

  async getWorkoutsInRange() {
    const res = await fetch("/api/workouts/range");
    const json = await res.json();
   console.log("API",json)
    return json;
  },
};
