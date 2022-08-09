exports.handler = async function (event, context) {
  try {
    const apiKey = `${process.env.API_KEY}`;
    console.log(apiKey);
    return {
      statusCode: 200,

      body: JSON.stringify({ apiKey: apiKey }),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
