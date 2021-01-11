const now = new Date();
const uuid = require("uuid").v4;

module.exports = [
  { id: uuid(), name: "Open Format", createdAt: now, updatedAt: now },
  { id: uuid(), name: "House", createdAt: now, updatedAt: now },
  { id: uuid(), name: "Deep House", createdAt: now, updatedAt: now },
  { id: uuid(), name: "Electro", createdAt: now, updatedAt: now },
  { id: uuid(), name: "Funk", createdAt: now, updatedAt: now },
  { id: uuid(), name: "Hip Hop", createdAt: now, updatedAt: now },
  { id: uuid(), name: "Rap", createdAt: now, updatedAt: now },
];
