/*
 * Represents the ages that a player can be, to be used to determine if exits
 * are usable based on age.
 */
const Age = {
  CHILD: 1,
  ADULT: 2,
  BOTH: 3
};

/**
 * Will hold all of the rooms that are currently active
 *
 * @prop {Array.Location} - Holds all of the locations on the map. Key is the
 *  name of the location so it can be referenced from other locations.
 */
class Map {
  /**
   * Creates a new map object.
   */
  constructor() {
    this.locations = [];
  }

  /**
   * Retrieves a location from the map's location list by using its name.
   *
   * @param  {string} locationName - The name of the location to retrieve.
   * @return {Location|null} - The requested location. Null if no location was
   *  found with given name.
   */
  getLocationByName(locationName) {
    // Loop through the locations until a location matches
    for (const location in this.locations) {
      if (locationName === location.name) {
        return location;
      }
    }
    return null;
  }

  /**
   * Paths to a given location from a given location
   *
   * @param  {Location|string} start - The location that the pathing should
   *  start at. If a string is passed, the location will be retrieved using
   *  the getLocationByName method.
   * @param  {Location|string} end - The location that the pathing should
   *  end at. If a string is passed, the location will be retrieved using
   *  the getLocationByName method.
   * @param {Age} age - The age to create a path for.
   * @param {Array.Location} locationsChecked - The locations that have been
   *  checked already, passed to eliminate infinite recursion.
   * @return {Array|false} - An array of steps that need to be taken to get to
   *  the requested location, where each step is an object explaining what to
   *  do to get to the next room. False if no path could be found.
   */
  pathToLocation(start, end, age, locationsChecked=[]) {
    // Make sure the passed start and end are parsed to Location objects
    if (typeof start === String) {
      start = this.getLocationByName(start);
    }
    if (typeof end === String) {
      end = this.getLocationByName(end);
    }

    // Check the start node to see if it has an exit that exits to the end
    let exitToEnd = start.exitForLocation(this, end, age);
    // If an exit exists, return the step to get to it
    if (exitToEnd) {
      return {
        "currentLocation": start,
        "exitUsing": exitToEnd,
        "resultingLocation": end
      };
    }
    // If no exit exists, call all of the location's exit location's
    // exitForLocation until one is found.
    else {
      // Add current location to existing locations checked
      locationsChecked.push(start.name);

      // Figure out which exits can be used, and check them as needed
      for (const exit in start.exits) {
        if (!(locationsChecked.includes(exit.exitsToReference))) {
          // This exit is valid, so check it and if it returns a path append
          // it's path to this ones and return it.
          locationsChecked.push(exit.exitsToReference);
          let exitLocation = exit.getExitLocation();
          let subPath = this.pathToLocation(
            exitLocation, end, age, locationsChecked
          );
          // Return the subpath with the current path
          if (subPath) {
            return {
              "currentLocation": start,
              "exitUsing": exit,
              "resultingLocation": exitLocation
            }.concat(subPath);
          }
        }
      }
      // If all exits were checked, and no path was found, return false
      return false;
    }
  }
}


/**
 * Represents a location within the game, holding it's exits.
 *
 * @prop {string} name - The human-readable name of the location.
 * @prop {boolean} clearedAsChild - Whether or not the room has been cleared of
 *  all checks as a child.
 * @prop {boolean} clearedAsAdult - Whether or not the room has been cleared of
 *  all checks as an adult.
 * @prop {Array.Exit} exits - The array of exits that are in the room.
 */
class Location {
  /**
   * Creates a new location object.
   *
   * @param {string} name - The human readable name of the location.
   */
  constructor(name) {
    this.name = name;
    this.clearedAsChild = false;
    this.clearedAsAdult = false;
    this.exits = [];
  }

  /**
   * Returns the exit that must be taken to go to a location. If the location
   * cannot be reached by this location, returns false.
   *
   * @param  {Map} map - The map to load the location from.
   * @param  {string} location - The location to check for.
   * @param {Age} age - The age to check the exit for.
   * @return {Exit|false} - The location that is able to
   */
  exitForLocation(map, location, age) {
    // Make sure the passed location is the location object and not a reference.
    if (typeof location === String) {
      location = map.getLocationByName(location);
    }
    // Loop through all the exits that are apart of this location.
    for (const exit in this.exits()) {
      // Return the exit if it can be navigated to by the given age.
      if (
        exit.getLocation().name === location.name &&
        (exit.age === age || exit.age === Age.BOTH)
      ) {
        return exit;
      }
    }
    // If the location could not be found, then return false.
    return false;
  }
}

/**
 * Represents an exit from a room.
 */
class Exit {
  /**
   * Exits to the
   * @param {string} name - The human readable name of the exit.
   * @param {string} exitsToReference - The location value passed as a reference
   *  to be retrieved with a map's getLocationByName method.
   * @param {Age} agesUsable - The ages that the exit is usable in.
   *  looking up the location the exit leaves to.
   */
  constructor(name, exitsToReference, age) {
    this.name = name;
    this.exitsToReference = exitsToReference;
    this.age = age;
  }

  /**
   * Gets the location that this exit exits to by reference
   *
   * @param {Map} map - The map that the exit exits inside.
   * @return {type}  description
   */
  getExitLocation(map) {
    map.getLocationByName(this.exitsToReference);
  }
}
