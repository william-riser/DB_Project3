const exampleJSON = [
  {
    name: "Estevan Janjic",
    height: 76,
    age: 20,
    weight: 197,
    position: "c",
    // A player can only have more than one school if they transferred,
    // but for this example, assume they only went to one school
    school: [
      {
        name: "Wiegand-Kreiger",
        location: "Lins",
      },
    ],
    stats: [
      {
        season: 2020,
        type: "steals",
        count: 426,
      },
    ],
    // A player does not have to be in a draft board
    draft_board: [],
    // Each player can have multiple scouting reports
    scouting_report: [
      {
        strength: "orci vehicula condimentum curabitur",
        weakness: "iaculis congue vivamus metus",
        notes: "justo sollicitudin ut suscipit a feugiat et",
      },
      {
        strength: "curabitur gravida",
        weakness: "non quam nec",
        notes: "nam congue risus semper porta volutpat quam pede",
      },
    ],
  },
  {
    name: "Malchy Andren",
    height: 81,
    age: 22,
    weight: 231,
    position: "pf",
    school: [
      {
        name: "Pfeffer LLC",
        location: "Włocławek",
      },
    ],
    // A player can have multiple stats
    stats: [
      {
        season: 2023,
        type: "assists",
        count: 253,
      },
      {
        season: 2022,
        type: "steals",
        count: 78,
      },
    ],
    // A player can be in 1 or more draft boards
    draft_board: [
      {
        id: 962,
        rank: 29,
      },
      {
        id: 400,
        rank: 18,
      }
    ],
    scouting_report: [
      {
        strength: "augue aliquam erat volutpat in",
        weakness: "vulputate luctus cum",
        notes: "pede lobortis ligula sit amet eleifend pede libero",
      },
      {
        strength: "lorem quisque",
        weakness: "blandit",
        notes: "praesent lectus vestibulum quam sapien",
      },
    ],
  },
];
