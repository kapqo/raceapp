const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Event = require("../../models/Event");

// POST api/events
// Create or update a event
// Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("location", "Location is required").not().isEmpty(),
      check("date", "Date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, location, date, time, organizer, name, avatar, description } = req.body;

    const user = await User.findById(req.user.id).select("-password");

    const eventFields = {};

    if (title) eventFields.title = title;
    if (location) eventFields.location = location;
    if (date) eventFields.date = date;
    eventFields.time = time;
    eventFields.organizer = user;
    eventFields.name = user.name;
    eventFields.avatar = user.avatar;
    if (description) eventFields.description = description;

    try {
      let event = await Event.findOne({ user: req.user.id });

      event = new Event(eventFields);

      await event.save();
      res.json(event);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// GET api/events
// Get all events
// Public
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// GET api/events/:event_id
// Get event by event ID
// Public
router.get("/:event_id", async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.event_id,
    });

    if (!event) return res.status(400).json({ msg: "Event not found" });

    res.json(event);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Event not found" });
    }
    res.status(500).send("Server Error");
  }
});

// DELETE api/event/:event_id
// Delete event by event ID
// Private
router.delete("/:event_id", auth, async (req, res) => {
  try {
    await Event.findOneAndRemove({ _id: req.params.event_id });

    res.json({ msg: "Event removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// PUT api/events/sure
// Add sure participants to event
// Private
router.put("/sure/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (
      event.sure.filter((sure) => sure.user.toString() === req.user.id).length >
      0
    ) {
      return res
        .status(400)
        .json({ msg: "You have been alredy sign up to this event" });
    }

    event.sure.unshift({ user: req.user.id });

    await event.save();

    res.json(event.sure);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// PUT api/events/unsure
// Add unsure participants to event
// Private
router.put("/unsure/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (
      event.unsure.filter((unsure) => unsure.user.toString() === req.user.id)
        .length > 0
    ) {
      return res
        .status(400)
        .json({ msg: "You have been alredy sign up to this event" });
    }

    event.unsure.unshift({ user: req.user.id });

    await event.save();

    res.json(event.unsure);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// PUT api/events/leaveSure
// Delete sure member from event
// Private
router.put("/leaveSure/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (
      event.sure.filter((sure) => sure.user.toString() === req.user.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ msg: "You have alredy opt out from this event" });
    }

    const removeIndex = event.sure
      .map((sure) => sure.user.toString())
      .indexOf(req.user.id);

    event.sure.splice(removeIndex, 1);

    await event.save();

    res.json(event.sure);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// PUT api/events/leaveUnsure
// Delete unsure member from event
// Private
router.put("/leaveUnsure/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (
      event.unsure.filter((unsure) => unsure.user.toString() === req.user.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ msg: "You have alredy opt out from this event" });
    }

    const removeIndex = event.unsure
      .map((unsure) => unsure.user.toString())
      .indexOf(req.user.id);

    event.unsure.splice(removeIndex, 1);

    await event.save();

    res.json(event.unsure);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// PUT api/events/event_id
// Create or update a event
// Private
router.put(
  "/:event_id",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("location", "Location is required").not().isEmpty(),
      check("date", "Date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, location, date, time, description } = req.body;

    const eventFields = {};

    if (title) eventFields.title = title;
    if (location) eventFields.location = location;
    if (date) eventFields.date = date;
    if (time) eventFields.time = time;
    if (description) eventFields.description = description;

    try {
      let event = await Event.findOne({ _id: req.params.event_id });

      if (event) {
        event = await Event.findOneAndUpdate(
          { _id: req.params.event_id },
          { $set: eventFields },
          { new: true }
        );
        res.json(event);
      }

      await event.save();
      res.json(event);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
