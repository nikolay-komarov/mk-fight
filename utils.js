const getCurrentDateToLog = () => {
  const dateToLog = new Date();
  return dateToLog.toLocaleTimeString().slice(0, -3);
};

export {
  getCurrentDateToLog
};
