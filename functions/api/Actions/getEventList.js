const getEventList = async () => {
  try {
    // handle getEvent
    let events = [{id: 'test', title: 'Get event success'}];
    return events;
  } catch (e) {
    console.log(e.toString());
  }
};

exports = module.exports = getEventList;
