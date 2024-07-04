// testController.js
// we use this because nanoid package is a part of ES module and its working only we use the dynamic import() syntax: below one;
const getNanoId = async () => {
    const { nanoid } = await import('nanoid');
  
    // Example usage
    return nanoid(8);
  };
  
module.exports = getNanoId;  