const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const path = require("path");
const dbPath = path.resolve(__dirname, "Points1-7/basketball.sqlite3");
const db = new sqlite3.Database(dbPath);

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Get all players
app.get("/data", (req, res) => {
  db.all(
    `SELECT * 
          FROM Player 
          LIMIT 12`,
    (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.json({ data: rows });
      }
    }
  );
});

// Get all stats
app.get("/api/stats", (req, res) => {
  db.all(
    `SELECT * 
          FROM Stat 
          ORDER BY count DESC
          LIMIT 12 `,
    (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.json({ data: rows });
      }
    }
  );
});


// Get all draft boards
app.get("/draftBoards", (req, res) => {
  db.all(
    `SELECT *
          FROM Draft_Board`,

    (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.json({ data: rows });
      }
    }
  );
});


// Gets players based on name
app.get("/players", (req, res) => {
  const { name } = req.query;
  db.all(
    `SELECT * FROM Player WHERE name LIKE ?`,
    ["%" + name + "%"],
    (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.json({ data: rows });
      }
    }
  );
});

// Gets player based on ID
app.get("/players/:id", (req, res) => {
  const { id } = req.params;
  db.all(
    `SELECT * FROM Player WHERE player_id = ?`,
    [id], // Parameterized input
    (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.json({ data: rows });
      }
    }
  );
});

// Gets Stat based on player ID
app.get("/stats/player/:id", (req, res) => {
  const { id } = req.params;
  db.all(`SELECT * FROM Stat WHERE player_id = ?`, [id], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ data: rows });
    }
  });
});

app.post("/new-data", (req, res) => {
  res.send("Data added");
});


// Gets draft board based on ID
app.get("/draftBoards/:id", (req, res) => {
  const { id } = req.params;
    db.all(
      `SELECT * FROM Draft_Board WHERE draft_board_id = ?`,
      [id],
      (err, rows) => {
        if (err) {
          res.status(400).json({ error: err.message });
        } else {
          res.json({ data: rows });
        }
      }
    );
  });

  app.get("/draftPicks/:id", (req, res) => {
    const { id } = req.params;
    db.all(
      `SELECT * 
      FROM Draft_Pick 
        INNER JOIN Player ON Draft_Pick.player_id = Player.player_id
      WHERE draft_board_id = ? 
      ORDER BY pick_number ASC
      `,
      [id],
      (err, rows) => {
        if (err) {
          res.status(400).json({ error: err.message });
        } else {
          res.json({ data: rows });
        }
      }
    );
  });

  // Gets Scouting Report based on player ID
  app.get("/scoutingReport/player/:id", (req, res) => {
    const { id } = req.params;
    db.all(
      `SELECT * FROM Scouting_Report WHERE player_id = ?`,
      [id],
      (err, rows) => {
        if (err) {
          res.status(400).json({ error: err.message });
        } else {
          res.json({ data: rows });
        }
      }
    );
  });

// Adds a new player to the database
app.post("/addPlayer", (req, res) => {
  const { school_id, name, age, height, weight, position } = req.body;
  const sql =
    "INSERT INTO Player (school_id, name, age, height, weight, position) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [school_id, name, age, height, weight, position];

  db.run(sql, values, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Player added successfully", player_id: this.lastID });
  });
});

// Adds a new stat to the database
app.post("/addStat", (req, res) => {
  const { player_id, season, type, count } = req.body;
  const sql =
    "INSERT INTO Stat (player_id, season, type, count) VALUES (?, ?, ?, ?)";
  const values = [player_id, season, type, count];

  db.run(sql, values, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Stat added successfully", player_id: this.lastID });
  });
});

// Adds a new scouting report to the database
app.post("/addScoutingReport", (req, res) => {
  const { player_id, strengths, weaknesses, notes } = req.body;
  const sql =
    "INSERT INTO Scouting_Report (player_id, strengths, weaknesses, notes) VALUES (?, ?, ?, ?)";
  const values = [player_id, strengths, weaknesses, notes];

  db.run(sql, values, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: "Scouting report added successfully",
      player_id: this.lastID,
    });
  });
});

// Add a new Draft Board to the database
app.post("/addDraftBoard", (req, res) => {
  const { name } = req.body;
  const sql = "INSERT INTO Draft_Board (name) VALUES (?)";
  const values = [name];

  db.run(sql, values, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Draft Board added successfully", draft_board_id: this.lastID });
  });
}
);

// Add a new Draft Pick to the database
app.post("/addDraftPick", (req, res) => {
  const { draft_board_id, player_id, pick_number, team } = req.body;
  const sql = "INSERT INTO Draft_Pick (draft_board_id, player_id, pick_number, team) VALUES (?, ?, ?, ?)";
  const values = [draft_board_id, player_id, pick_number];

  db.run(sql, values, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Draft Pick added successfully", draft_pick_id: this.lastID });
  });
});

// Deletes a player and their records from the database
app.delete("/players/:id", (req, res) => {
  const playerId = req.params.id;

  // Delete from Scouting_Report
  const deleteScoutingReportSql = "DELETE FROM Scouting_Report WHERE player_id = ?";
  db.run(deleteScoutingReportSql, [playerId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Delete from Stat
    const deleteStatSql = "DELETE FROM Stat WHERE player_id = ?";
    db.run(deleteStatSql, [playerId], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Delete from Player
      const deletePlayerSql = "DELETE FROM Player WHERE player_id = ?";
      db.run(deletePlayerSql, [playerId], function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.json({ message: "Player and records deleted successfully", player_id: playerId });
      });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
